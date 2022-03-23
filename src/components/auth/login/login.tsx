import {Component, ComponentInterface, Event, h, Method, Prop, State} from '@stencil/core';
import {AuthService} from '../../../services/auth.service';
import {ConvertServerError} from '../../../helpers/string-utils';
import {first} from "rxjs/operators";
import i18n from "./i18n.json";
import {EventLoginSuccess} from "../../../events/login-success-event";
import {EventLoginReset} from "../../../events/login-reset-event";
import {EventLoginSignUp} from "../../../events/login-sign-up-event";
import {EventLoginProgress} from "../../../events/login-progress-event";
import {ILogin} from "../../../interfaces/user";

@Component({
  tag: 'flx-auth-login',
  styleUrl: 'login.scss'
})

export class Login implements ComponentInterface {
  @Prop() i18n = i18n;
  @Prop() mode: "md" | "ios" = "md";
  @State() errors: any = {};
  @State() loadingByIndicator: string[] = [];
  @State() data: ILogin = {
    identifier: '',
    password: ''
  };

  @Event() loginSuccess: EventLoginSuccess;
  @Event() loginReset: EventLoginReset;
  @Event() signUp: EventLoginSignUp;
  @Event() loginProgress: EventLoginProgress;

  @Method('resetErrors')
  resetErrorsHandler() {
    this.errors = {};
  }

  setLoginByType(type: string) {
    this.loadingByIndicator.push(type);
    this.loadingByIndicator = [...this.loadingByIndicator];
  }

  login(event) {
    this.loginProgress.emit(true);
    this.setLoginByType('login');
    event.preventDefault();
    AuthService.login(
      this.data.identifier?.trim(),
      this.data.password?.trim()
    ).pipe(first()).subscribe({
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
    });
  }

  resetPassword() {
    this.loginProgress.emit(true);
    this.setLoginByType('resetPassword');
    AuthService.resetPassword(
      this.data.identifier?.trim()
    ).pipe(first()).subscribe({
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
    });
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
    return [<form onSubmit={event => this.login(event)} novalidate>
      <div class="form-container">
        <div class="input">
          <input type="text" name="email" onInput={event => this.handleInput(event)} autocomplete="on"
                 class="input-field" required/>
          <label class="input-label">{this.i18n.identifier.label}</label>
        </div>
        <flx-auth-info-item icon="information-circle-outline" color="danger"
                            infos={ConvertServerError(this.errors?.identifier, this.i18n.identifier.errors)}/>
        <div class="input">
          <input type="password" name="password" onInput={(event) => this.handleInput(event)} autocomplete="on"
                 class="input-field" required/>
          <label class="input-label">{this.i18n.password}</label>
          <ion-button color="medium"
                      disabled={(this.loadingByIndicator.indexOf('resetPassword') !== -1)}
                      fill="clear"
                      slot="end"
                      mode={this.mode}
                      size="small"
                      type="button"
                      onClick={() => this.clickLostPassword()}
                      class="forgot-password-button ion-text-uppercase">{this.i18n.password.forgot}</ion-button>
        </div>
        <flx-auth-info-item icon="information-circle-outline" color="danger"
                            infos={ConvertServerError(this.errors?.password, this.i18n.password.errors)}/>
        <ion-button disabled={(this.loadingByIndicator.indexOf('login') !== -1)}
                    color="secondary"
                    mode={this.mode}
                    class="submit-button"
                    type="submit"
                    expand="block">
          <ion-label mode={this.mode}>{this.i18n.login}</ion-label>
          {this.loadingByIndicator.indexOf('login') !== -1 &&
            <ion-spinner name="crescent" slot="end"/>
          }
        </ion-button>
        <input type="submit" value={this.i18n.login} style={{display: 'none'}}/>
      </div>
    </form>];
  }
}
