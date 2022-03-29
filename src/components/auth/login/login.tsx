import {Component, ComponentInterface, Event, h, Method, Prop, State} from '@stencil/core';
import {ConvertServerError} from '../../../helpers/string-utils';
import {EventLoginSuccess} from "../../../events/login-success-event";
import {EventLoginReset} from "../../../events/login-reset-event";
import {EventLoginError} from "../../../events/login-error-event";
import {EventLoginSignUp} from "../../../events/login-sign-up-event";
import {EventLoginProgress} from "../../../events/login-progress-event";
import {ILogin, UserLoginAllowedKeys} from "../../../interfaces/user";
import {AuthService} from "../../../services/auth.service";

const i18n = {
  "login": "Login",
  "identifier": {
    "label": "EMail",
    "errors": {
      "required": "E-mail is required",
      "minlen": "E-Mail must be at least 4 characters long",
      "email": "Email is invalid.",
      "exists": "E-Mail already exists.",
      "identical": "You cannot add the same e-mail.",
      "noaccountfound": "No account found with this email.",
      "notvalid": "Invalid account. Check the input for invalid characters."
    }
  },
  "password": {
    "label": "Password",
    "forgot": "Forgot your password?",
    "errors": {
      "required": "E-mail is required",
      "minlen": "E-Mail must be at least 4 characters long",
      "email": "Email is invalid.",
      "exists": "E-Mail already exists.",
      "identical": "You cannot add the same e-mail.",
      "noaccountfound": "No account found with this email.",
      "notvalid": "Invalid account. Check the input for invalid characters."
    }
  }
};

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

  @Event() loginSuccess: EventLoginSuccess | undefined;
  @Event() loginReset: EventLoginReset | undefined;
  @Event() loginError: EventLoginError | undefined;
  @Event() signUp: EventLoginSignUp | undefined;
  @Event() loginProgress: EventLoginProgress | undefined;

  @Method()
  async resetErrors() {
    this.errors = {};
  }

  setLoginByType(type: string) {
    this.loadingByIndicator.push(type);
    this.loadingByIndicator = [...this.loadingByIndicator];
  }

  login(event: Event) {
    if(this.loginProgress) {
      this.loginProgress.emit(true);
    }
    this.setLoginByType('login');
    event.preventDefault();
    AuthService.login(
      this.data.identifier?.trim(),
      this.data.password?.trim()
    ).subscribe({
      next: () => {
        this.loginSuccess?.emit(true);
        this.loginProgress?.emit(false);
        setTimeout(() => {
          this.loadingByIndicator = [];
        }, 1000);
      },
      error: (error) => {
          this.loginSuccess?.emit(false);
          this.loginProgress?.emit(false);
          this.loginError?.emit(this.data);
          this.loadingByIndicator = [];
          this.errors = error.errors;
      }
    });
  }

  resetPassword() {
    if(this.loginProgress) {
      this.loginProgress.emit(true);
    }
    this.setLoginByType('resetPassword');
    AuthService.resetPassword(
      this.data.identifier?.trim()
    ).subscribe({
      next: () => {
        this.loginReset?.emit(true);
        this.loginProgress?.emit(false);
        this.loadingByIndicator = [];
      }, error: (error) => {
          this.loginReset?.emit(false);
          this.loginProgress?.emit(false);
          this.errors = error?.errors;
          this.loadingByIndicator = [];
      }
    });
  }

  clickLostPassword() {
    this.resetPassword();
  }

  handleInput(event:any) {
    this.errors = {};
    if (event && event.target) {
      if (event.target.name === "email") {
        this.data.identifier = event.target.value;
      } else {
        const key:UserLoginAllowedKeys = event.target.name;
        this.data[key] = event.target.value;
      }
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
          <label class="input-label">{this.i18n.password.label}</label>
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
