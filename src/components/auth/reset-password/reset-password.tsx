import {Component, ComponentInterface, Event, h, Method, Prop, State} from '@stencil/core';
import {AuthService} from '../../../services/auth.service';
import {ConvertServerError} from '../../../helpers/string-utils';
import {IAuthReset} from '../../../interfaces/auth';
import {SuccessToast} from "../../../helpers/default-toasts";
import i18n from "./i18n.json";
import {EventResetSuccess} from "../../../events/reset-success-event";
import {EventResetSubmit} from "../../../events/reset-submit-event";
import {first} from "rxjs/operators";

@Component({
  tag: 'flx-auth-reset-password',
  styleUrl: 'reset-password.scss'
})
export class ResetPassword implements ComponentInterface {
  @Prop() confirmationCode: string;
  @Prop() userId: string;
  @Prop() i18n = i18n;
  @State() errors: any = {};
  @State() spinner = false;
  @State() data: IAuthReset = {
    password: '',
    retype: ''
  };
  @Event() resetSuccess: EventResetSuccess;
  @Event() resetSubmit: EventResetSubmit;

  @Method('resetErrors')
  resetErrorsHandler() {
    this.errors = {};
  }

  reset(event) {
    event.preventDefault();
    this.resetSubmit.emit(true);
    AuthService.changePassword(
      this.data,
      this.confirmationCode,
      this.userId,
    ).pipe(first()).subscribe({
      next: async () => {
        await SuccessToast('We changed your password!');
        this.resetSuccess.emit(true);
        this.resetSubmit.emit(false);
      }, error: (error) => {
        this.errors = error.errors;
        this.resetSuccess.emit(false);
        this.resetSubmit.emit(false);
      }
    });
  }

  handleInput(event) {
    this.errors = {};
    this.data[event.target.name] = event.target.value;
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
