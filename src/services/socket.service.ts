import {io, Socket} from 'socket.io-client';
import {Subject} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {environment} from "./environment.service";

class SocketServiceController {

  socket: Socket|null = null;
  subscriptions = [];
  private messages$: Subject<any> = new Subject<any>();
  public messages = this.messages$.asObservable();

  connect() {
    if(environment.SOCKET_SERVER) {
      if (!this.socket) {
        this.socket = io(environment.SOCKET_SERVER, {
          forceNew: true,
          withCredentials: true,
          transports: ['websocket']
        });
        this.socket.on('message', (event) => {
          this.onMessage(event);
        });
      } else if (this.socket?.disconnected) {
        this.socket.connect();
      }
      return this;
    }else{
      console.error('no socket server set')
      return null;
    }
  }

  disConnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  subscribeMessageByType(type: string) {
    return this.messages.pipe(
      filter((msg: any) => msg.hasOwnProperty(type)),
      map((msg: any) => {
        return msg[type];
      })
    );
  }

  subscribe(id:never) {
    if (id) {
      if (this.subscriptions.indexOf(id) === -1) {
        this.subscriptions.push(id);
      }
      if(this.socket) {
        this.socket.on('connect', () => {
          this.subscriptions.map(id => {
            if(this.socket) {
              this.socket.emit('subscribe', id);
            }
          });
        });
      }
    }
  }

  unSubscribe(id:never) {
    console.log('unSubscribe', this.socket)
    if (this.socket && this.socket.connected) {
      this.socket.emit('unsubscribe', id);
    }
  }

  onMessage(event:any) {
    this.messages$.next(JSON.parse(event));
  }
}

export const SocketService = new SocketServiceController();
