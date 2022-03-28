import {Observable, Subject} from 'rxjs';
import {Credentials, ICredentials} from '../interfaces/credentials';
import {StorageService} from './storage.service';
import {SetupService} from "./setup.service";

export type RestCache = "reload" | "no-store" | "no-cache" | "force-cache" | "default";

export abstract class RestService {

  private ownHeaders:{name : string, value:any}[] = [];

  private headers: Headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  private api: string| null = null;

  public setApi(api:string) {
    this.api = api;
  }

  public setHeaders(ownHeaders:{name:string, value:any}[]){
    this.ownHeaders = ownHeaders;
  }

  public setAuthHeader(credentials: ICredentials, ownHeaders?:{name : string, value:any}[]) {
    if (credentials) {
      if (credentials.hasOwnProperty('token') && credentials.token != null) {
        this.setHeaders([
          {name: 'x-auth-resource', value: credentials.resource},
          {name: 'x-auth-token', value: credentials.token}
        ]);
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

  public appendHeader(name:string, value:any) {
    this.headers.append(name, value);
  }

  public setHeader(name:string, value:any) {
    this.headers.set(name, value);
  }

  public deleteHeader(name:string) {
    this.headers.delete(name);
  }

  public read(url:string, data?:any, cache?: RestCache): Observable<any> {
    return this.fetch(this.request(url, 'GET', data, cache));
  }

  public create(url:string, data?:any): Observable<any> {
    return this.fetch(this.request(url, 'POST', data));
  }

  public update(url:string, data?:any): Observable<any> {
    return this.fetch(this.request(url, 'PUT', data));
  }

  public add(url:string, data?:any): Observable<any> {
    return this.fetch(this.request(url, 'PATCH', data));
  }

  public delete(url:string, data?:any): Observable<any> {
    return this.fetch(this.request(url, 'DELETE', data));
  }

  public createGetBlob(url:string, data?:any): Observable<any> {
    return this.fetchBlob(this.request(url, 'POST', data));
  }


  private request(endPoint: string, method: string, data: any, cache: RestCache = "default", requestCredentials: RequestCredentials = 'include') {

    method = method.toUpperCase();

    if(!this.api && SetupService.config?.REST_API) {
      this.api = SetupService.config?.REST_API;
    }

    if (!this.api) {
      throw new Error('no api is set');
    }

    const credentials = new Credentials().deserialize(StorageService.get('credentials'));
    this.setAuthHeader(credentials, this.ownHeaders);
    let api = this.api + endPoint;
    let init:{[key:string]:any} = {
      method,
      headers: this.headers,
      cache,
      credentials: requestCredentials
    };
    if (data && method !== 'GET') {
      init['body'] = JSON.stringify(data);
    }
    if (data && method === 'GET') {
      const queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
      api = api + "?" + queryString;
    }

    return new Request(api, init)
  }

  private fetch(request:any) {
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

  private fetchBlob(request:any) {
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
