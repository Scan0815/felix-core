import {Component, ComponentInterface, Event, EventEmitter, h, Prop, State, Watch} from '@stencil/core';
import {AuthService} from '../../../services/auth.service';
import {ConvertServerError} from '../../../helpers/string-utils';
import {Subscription} from "rxjs";
import i18n from "./i18n.json";

interface ILogin {
  identifier: string,
  password: string
}

@Component({
  tag: 'auth-login',
  styleUrl: 'login.scss'
})

export class Login implements ComponentInterface {
  @Prop() resetErrors: number;
  @Prop() i18n = i18n;
  @State() errors: any = {};
  @State() loadingByIndicator: string[] = [];
  @State() data: ILogin = {
    identifier: '',
    password: ''
  };

  @Event() loginSuccess: EventEmitter;
  @Event() loginReset: EventEmitter;
  @Event() signUp: EventEmitter;
  @Event() loginProgress: EventEmitter;

  private subscriptions: Subscription[] = [];

  @Watch('resetErrors')
  watchHandler() {
    this.errors = {};
  }

  disconnectedCallback() {
    this.subscriptions.forEach((subscription: Subscription, index) => {
      subscription.unsubscribe();
      this.subscriptions.splice(index, 1);
    })
  }

  setLoginByType(type: string) {
    this.loadingByIndicator.push(type);
    this.loadingByIndicator = [...this.loadingByIndicator];
  }

  login(event) {
    this.loginProgress.emit(true);
    this.setLoginByType('login');
    event.preventDefault();
    this.subscriptions.push(AuthService.login(
      this.data.identifier?.trim(),
      this.data.password?.trim()
    ).subscribe({
      next: () => {
        setTimeout(() => {
          this.loginSuccess.emit(true);
          this.loginProgress.emit(false);
        }, 200);
        setTimeout(() => {
          this.loadingByIndicator = [];
        }, 1000);
      },
      error: (error) => {
        this.loginSuccess.emit(false);
        this.loginProgress.emit(false);
        this.loadingByIndicator = [];
        this.errors = error.errors;
        if (this.errors?.identifier?.noaccountfound) {
          this.signUp.emit(Object.assign({
            name: '',
            identifier: '',
            password: ''
          }, this.data));
        }
      }
    }));
  }

  resetPassword() {
    this.loginProgress.emit(true);
    this.setLoginByType('resetPassword');
    this.subscriptions.push(AuthService.resetPassword(
      this.data.identifier?.trim()
    ).subscribe({
      next: () => {
        this.loginReset.emit(true);
        this.loginProgress.emit(false);
        this.loadingByIndicator = [];
      }, error: (error) => {
        this.loginReset.emit(false);
        this.loginProgress.emit(false);
        this.errors = error?.errors;
        this.loadingByIndicator = [];
      }
    }));
  }

  clickLostPassword() {
    this.resetPassword();
  }

  handleInput(event) {
    this.errors = {};
    if (event.target.name === "email") {
      this.data["identifier"] = event.target.value;
    } else {
      this.data[event.target.name] = event.target.value;
    }
  }

  render() {
    return [<form onSubmit={(event) => this.login(event)} novalidate>

      <div class="form-container">
        <div class="input">
          <input name="email" onInput={(event) => this.handleInput(event)} autocomplete="on" type="text"
                 class="input-field" required/>
          <label class="input-label">{this.i18n.identifier.label}</label>
        </div>
        <form-info-item icon="information-circle-outline" color="danger"
                        infos={ConvertServerError(this.errors?.identifier,this.i18n.identifier.errors)}>
        </form-info-item>
        <div class="input">
          <input name="password" onInput={(event) => this.handleInput(event)} autocomplete="on" type="password"
                 class="input-field" required/>
          <label class="input-label">{this.i18n.password}</label>
          <ion-button color="medium"
                      disabled={(this.loadingByIndicator.indexOf('resetPassword') !== -1)}
                      fill="clear"
                      slot="end"
                      mode="md"
                      size="small"
                      type="button"
                      onClick={() => this.clickLostPassword()}
                      class="forgot-password-button ion-text-uppercase">
            {this.i18n.password.forgot}
          </ion-button>
        </div>
        <form-info-item icon="information-circle-outline" color="danger"
                        infos={ConvertServerError(this.errors?.password, this.i18n.password.errors)}>
        </form-info-item>
        <ion-button disabled={(this.loadingByIndicator.indexOf('login') !== -1)}
                    color="secondary"
                    mode="md"
                    class="submit-button"
                    type="submit"
                    expand="block">
          <ion-label mode="md">{this.i18n.login}</ion-label>
          {(this.loadingByIndicator.indexOf('login') !== -1) &&
            <ion-spinner name="crescent" slot="end">
            </ion-spinner>
          }
        </ion-button>
        <input type="submit" value="Login" style={{display: 'none'}}>
        </input>
      </div>
    </form>];
  }
}
