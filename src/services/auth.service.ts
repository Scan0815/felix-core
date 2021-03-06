import {BehaviorSubject, first, lastValueFrom, Observable} from 'rxjs';
import {RestService} from './rest.service';
import {catchError, map} from 'rxjs/operators';
import {AuthResponse} from '../interfaces/auth-response';
import {StorageService} from './storage.service';
import {Credentials, ICredentials} from '../interfaces/credentials';
import {AccountService} from './account.service';
import {IAuthReset} from '../interfaces/auth';
import {getCurrentLocale} from './i18n.service';

class AuthServiceController extends RestService {

  private isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn = this.isLoggedIn$.asObservable();
  private credentials$: BehaviorSubject<ICredentials> = new BehaviorSubject<ICredentials>(
    new Credentials().deserialize({token: null, resource: null}
    ));
  public credentials = this.credentials$.asObservable();

  constructor() {
    super();
    const credentials = new Credentials().deserialize(StorageService.get('credentials'));
    this.credentials$.next(credentials);
    if (credentials
      && credentials.hasOwnProperty('token')
      && credentials.token !== null) {
      this.isLoggedIn$.next(true);
    } else {
      this.isLoggedIn$.next(false);
    }
  }

  public isLoggedInValue() {
    return this.isLoggedIn$.getValue();
  }

  public login(identifier: string, password: string): Observable<AuthResponse> {
    return this.create('/auth/login', {identifier, password, locale: getCurrentLocale()}).pipe(
      first(),
      map((response: AuthResponse) => {
        console.log('login',response)
        this.setCredentials(response);
        return response;
      })
    );
  }

  public register(identifier: string, password: string, retype: string|null , name: string, ext_id: string|null = null): Observable<AuthResponse> {
    return this.create('/auth/register', {
      identifier,
      password,
      retype,
      name,
      ext_id,
      locale: getCurrentLocale()
    }).pipe(
      first(),
      map((response: AuthResponse) => {
        this.setCredentials(response);
        return response;
      })
    );
  }

  public resetPassword(identifier: string): Observable<any> {
    return this.create('/auth/resetPassword', {identifier, locale: getCurrentLocale()}).pipe(
      first(),
      map((response: AuthResponse) => {
        return response;
      })
    );
  }

  public changePassword(reset: IAuthReset, confirmationCode: string, id: string): Observable<any> {
    const data = Object.assign(reset, {locale: getCurrentLocale()})
    return this.create(`/auth/changePassword/${confirmationCode}/${id}`, data).pipe(
      first(),
      map((response: AuthResponse) => {
        this.setCredentials(response);
        return response;
      })
    );
  }

  public logout() {
    const observer = this.create(`/logout`, null).pipe(
      first(),
      map(() => {
        this.removeCredentials();
      }),
      catchError(err => {
        this.removeCredentials();
        throw err;
      })
    );
    return lastValueFrom(observer);
  }

  public checkCredentials(): Promise<ICredentials> {
    return new Promise<ICredentials>((resolve, reject) => {
      const token = this.credentials$.getValue().token;
      const savedToken = StorageService.get('credentials').token;
      if (token !== savedToken) {
        this.removeCredentials();
        reject(null);
      } else {
        resolve(this.credentials$.getValue());
      }
    });
  }

  public removeCredentials() {
    const resource = this.credentials$.getValue().resource;
    const credentials = new Credentials().deserialize(
      {resource}
    );
    this.credentials$.next(credentials);
    StorageService.set('credentials', credentials);
    this.setAuthHeader(credentials);
    this.isLoggedIn$.next(false);
    AccountService.remove();
  }

  private setCredentials(auth: AuthResponse) {
    this.setAuthHeader(auth.credentials);
    AccountService.set(auth.user);
    StorageService.set('credentials', auth.credentials);
    this.credentials$.next(auth.credentials);
    this.isLoggedIn$.next(true);
  }

}

export const AuthService = new AuthServiceController();
