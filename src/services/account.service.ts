import {RestService} from './rest.service';
import {StorageService} from './storage.service';
import {BehaviorSubject, first, Observable, Subject} from 'rxjs';
import {IUser, User, UserStatus} from '../interfaces/user';
import {map} from 'rxjs/operators';
import {AuthResponse} from '../interfaces/auth-response';
import {ToastService} from './toast.service';
import {AlertConfirm} from '../helpers/alert-utils';
import {ObjectCompare} from '../helpers/object-utils';
import {getCurrentLocale, i18n} from './i18n.service';
import {LogoutErrorHandling} from '../helpers/router.utils';
import {environment} from "./environment.service";

class AccountServiceController extends RestService {
  public modalOpened = false;
  private account$: BehaviorSubject<IUser|null> = new BehaviorSubject<IUser|null>(null);
  public account = this.account$.asObservable();
  private payedSubscribed$: Subject<string> = new Subject<string>();
  public payedSubscribed = this.payedSubscribed$.asObservable();

  constructor() {
    super();
    if(environment.REST_API) {
      this.setApi(environment.REST_API);
    }
    let account = StorageService.get('account');
    account = (account) ? new User().deserialize(account) : null;
    this.account$.next(account);
    if (this.id()) {
      this.sync();
    }
  }

  public getAccount() {
    return this.account$.getValue();
  }

  public id() {
    return this.getAccount()?._id;
  }

  public isLoggedIn(id: string) {
    return (this.id() === id);
  }

  public hasRole(role: string) {
    const account = this.account$.getValue();
    if (account && account.roles) {
      return (typeof account.roles.find((r) => (r.name === role)) === 'object');
    } else {
      return false;
    }
  }

  public hasStatus(status: UserStatus) {
    const account = this.account$.getValue();
    return (account && account.status === status)
  }

  public set(user: IUser, assign = false) {
    if (assign) {
      const oldUser = this.account$.getValue();
      if (oldUser) {
        user = Object.assign(oldUser, user);
      }
    }
    const user$ = new User().deserialize(user);
    if (!ObjectCompare(this.account$.getValue(), user$)) {
      this.account$.next(user$);
    }
    StorageService.set('account', user$);
  }

  public remove() {
    this.account$.next(null);
    StorageService.remove('account');
  }

  public sync() {
    const id = this.id();
    if (id) {
      return this.read(`/user/${id}`)
        .pipe(first())
        .subscribe({
          next: (user) => {
            const _user = new User().deserialize(user);
            this.set(_user);
            return _user;
          }, error: async (e) => {
            await LogoutErrorHandling(e);
            return null;
          }
        });
    } else {
      return null;
    }
  }

  public MessageForConfirmState() {
    return AlertConfirm(
      i18n('Activate account').t('de', 'Account aktivieren').get(),
      i18n('We have already sent you a confirmation mail. Please also check your spam folder!')
        .t('de', 'Wir haben dir bereits eine Bestätigungsmail gesendet. Bitte schaue auch in deinem Spamordner nach!').get(), () => {
        this.sync();
      }, () => {
        this.resendConfirmation().subscribe(() => {
          ToastService.presentToast(
            i18n('Please check your mailbox and confirm your account!')
              .t('de', 'Bitte schaue in dein Postfach und bestätige deinen Account!').get(),
            'Okay',
            null,
            'success').then();
        });
      }, i18n('E-mail has been confirmed').t('de', 'E-Mail wurde bestätigt').get(),
      i18n('Resend e-mail').t('de', 'E-Mail erneut senden').get(),
      'sendMailAgain'
    );
  }

  public resendConfirmation() {
    const account = this.account$.getValue();
    return this.create(`/resendConfirmation`, {account, locale: getCurrentLocale()});
  }

  public changeIdentifier(identifier: string): Observable<any> {
    return this.create('/changeIdentifier', {identifier, locale: getCurrentLocale()}).pipe(
      map((response: AuthResponse) => {
        return response.user;
      })
    );
  }
}

export const AccountService = new AccountServiceController();
