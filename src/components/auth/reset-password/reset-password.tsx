import {Component, ComponentInterface, Event, h, Method, Prop, State} from '@stencil/core';
import {ConvertServerError} from '../../../helpers/string-utils';
import {SuccessToast} from "../../../helpers/default-toasts";
import {EventResetSuccess} from "../../../events/reset-success-event";
import {EventResetSubmit} from "../../../events/reset-submit-event";
import {first} from "rxjs/operators";
import {IReset, UserResetAllowedKeys} from "../../../interfaces/user";
import {AuthService} from "../../../services/auth.service";

const i18n = {
  "retype": {
    "label": "repeat Password",
    "placeholder": "Re-enter your password",
    "errors": {
      "required": "Password is required.",
      "minlen": "Password must be at least 8 characters long.",
      "equal": "Password not identical."
    }
  },
  "password": {
    "change": "Change password",
    "label": "Password",
    "placeholder": "Your Password",
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
  tag: 'flx-auth-reset-password',
  styleUrl: 'reset-password.scss'
})
export class ResetPassword implements ComponentInterface {
  @Prop() confirmationCode: string = '';
  @Prop() userId: string = '';
  @Prop() i18n = i18n;
  @State() errors: any = {};
  @State() spinner = false;
  @State() data: IReset = {
    password: '',
    retype: ''
  };
  @Event() resetSuccess: EventResetSuccess|undefined;
  @Event() resetSubmit: EventResetSubmit|undefined;

  @Method()
  async resetErrors() {
    this.errors = {};
  }

  reset(event: Event) {
    event.preventDefault();
    if(this.resetSubmit) {
      this.resetSubmit.emit(true);
    }
    AuthService.changePassword(
      this.data,
      this.confirmationCode,
      this.userId,
    ).pipe(first()).subscribe({
      next: async () => {
        await SuccessToast('We changed your password!');
        this.resetSuccess?.emit(true);
        this.resetSubmit?.emit(false);
      }, error: (error) => {
        this.errors = error.errors;
        this.resetSuccess?.emit(false);
        this.resetSubmit?.emit(false);
      }
    });
  }

  handleInput(event:any) {
    this.errors = {};
    if(event.target) {
      const key: UserResetAllowedKeys = event.target.name;
      this.data[key] = event.target.value;
    }
  }

  render() {
    return [
      <form onSubmit={(event) => this.reset(event)} novalidate>
        <ion-list>
          <ion-item>
            <ion-label mode="md" class="sizeMedium ion-text-uppercase"
                       position="floating">{this.i18n.password.label}</ion-label>
            <ion-input onInput={(event) => this.handleInput(event)} name="password" type="password"
                       placeholder={this.i18n.password.placeholder} required={true}/>
          </ion-item>
          <flx-auth-info-item icon="information-circle-outline" color="danger"
                              infos={ConvertServerError(this.errors?.password, this.i18n.password.errors)}/>
          <ion-item>
            <ion-label mode="md" class="sizeMedium ion-text-uppercase"
                       position="floating">{this.i18n.retype.label}</ion-label>
            <ion-input onInput={(event) => this.handleInput(event)} name="retype" type="password"
                       placeholder={this.i18n.retype.placeholder} required={true}/>
          </ion-item>
          <flx-auth-info-item icon="information-circle-outline" color="danger"
                              infos={ConvertServerError(this.errors?.retype, this.i18n.retype.errors)}/>
        </ion-list>
        <ion-button mode="md" color="secondary" type="submit" expand="block">
          {this.i18n.password.change}
        </ion-button>
      </form>
    ]
  }
}
