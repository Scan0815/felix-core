import {Observable, Subject} from 'rxjs';
import {Credentials, ICredentials} from '../interfaces/credentials';
import {StorageService} from './storage.service';

export type RestCache = "reload" | "no-store" | "no-cache" | "force-cache" | "default";

export abstract class RestService {

  private ownHeaders:{name : string, value:any}[] = [];

  private headers: Headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  private api: string;

  public setApi(api) {
    this.api = api;
  }

  public SetOwnHeaders(ownHeaders?:{name : string, value:any}[]){
    this.ownHeaders = ownHeaders;
  }

  public setAuthHeader(credentials: ICredentials, ownHeaders?:{name : string, value:any}[]) {
    if (credentials) {
      if (credentials.hasOwnProperty('token') && credentials.token != null) {
        this.setHeader('x-auth-resource', credentials.resource);
        this.setHeader('x-auth-token', credentials.token);
      } else {
        if (credentials.hasOwnProperty('resource') && credentials.resource != null) {
          this.setHeader('x-auth-resource', credentials.resource);
        }
        this.deleteHeader('x-auth-token');
      }
    }
    if(ownHeaders) {
      ownHeaders.forEach(header => {
        this.setHeader(header.name, header.value);
      });
    }
  }

  public appendHeader(name, value) {
    this.headers.append(name, value);
  }

  public setHeader(name, value) {
    this.headers.set(name, value);
  }

  public deleteHeader(name) {
    this.headers.delete(name);
  }

  public read(url, data?, cache?: RestCache): Observable<any> {
    return this.fetch(this.request(url, 'GET', data, cache));
  }

  public create(url, data?): Observable<any> {
    return this.fetch(this.request(url, 'POST', data));
  }

  public update(url, data?): Observable<any> {
    return this.fetch(this.request(url, 'PUT', data));
  }

  public add(url, data?): Observable<any> {
    return this.fetch(this.request(url, 'PATCH', data));
  }

  public delete(url, data?): Observable<any> {
    return this.fetch(this.request(url, 'DELETE', data));
  }

  public createGetBlob(url, data?): Observable<any> {
    return this.fetchBlob(this.request(url, 'POST', data));
  }


  private request(endPoint: string, method: string, data: any, cache: RestCache = "default", requestCredentials: RequestCredentials = 'include') {

    method = method.toUpperCase();

    if (!this.api) {
      throw new Error('no api is set');
    }

    const credentials = new Credentials().deserialize(StorageService.get('credentials'));
    this.setAuthHeader(credentials, this.ownHeaders);
    let api = this.api + endPoint;
    let init = {
      method,
      body: null,
      headers: this.headers,
      cache,
      credentials: requestCredentials
    };
    if (data && method !== 'GET') {
      init.body = JSON.stringify(data);
    }
    if (data && method === 'GET') {
      const queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
      api = api + "?" + queryString;
    }

    return new Request(api, init)
  }

  private fetch(request) {
    return new Observable(observable => {
      fetch(request).then(response => {
        response.text().then(text => {
            let data;
            try {
              data = JSON.parse(text);
            } catch (err) {
              data = text || null;
            }
            if (response.ok) {
              observable.next(data);
            } else {
              observable.error(Object.assign(data || {}, {_response: response}));
            }
            observable.complete();
          }
        )
      }).catch(e => {
        observable.error((!e.hasOwnProperty('json')) ? e : e.json);
        observable.complete();
      });
    })
  }

  private fetchBlob(request) {
    const response$ = new Subject();
    fetch(request).then(response => {
      response.blob().then(blob => {
        response$.next(blob);
        response$.complete();
      })
    }, error => {
      response$.error(error.json);
      response$.complete();
    });
    return response$.asObservable();
  }

}
