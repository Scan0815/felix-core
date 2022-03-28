import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Method,
  Prop,
  State
} from '@stencil/core';
import {FileStackCropper} from '../../../helpers/file-stack-utils';
import {OverlayEventDetail} from '@ionic/core';
import {ITransfer, Transfer} from '../../../interfaces/transfer';
import {IRegister, User, UserRegisterAllowedKeys} from '../../../interfaces/user';
import {Credentials} from '../../../interfaces/credentials';
import {InitChunkUpload} from '../../../helpers/upload-utils';
import {Compress} from '../../../helpers/image-utils';
import {ConvertServerError} from '../../../helpers/string-utils';
import {Subscription} from "rxjs";
import {SetupService} from "../../../services/setup.service";
import {first} from "rxjs/operators";
import {AuthService} from "../../../services/auth.service";
import {StorageService} from "../../../services/storage.service";
import {ToastService} from "../../../services/toast.service";
import {AccountService} from "../../../services/account.service";

const i18n = {
  "signUp": "Create account",
  "confirm": "You confirm that you are agree the T&Cs and the Privacy Policy.",
  "name": {
    "label": "Name",
    "errors": {
      "badword": "This name contains invalid terms",
      "required": "Name is required.",
      "minlen": "The name must be at least 3 characters long.",
      "exists": "This name already exists.",
      "username": "The name may contain only a-z, A-Z, 0-9, -, _",
      "notvalid": "Invalid name. Check the input for invalid characters",
      "alphaspace": "Your name may only contain letters and spaces."
    }
  },
  "identifier": {
    "label": "EMail",
    "confirm": {
      "message": "Please check your e-mail and confirm your account!",
      "button": "okay"
    },
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
  tag: 'flx-auth-sign-up',
  styleUrl: 'sign-up.scss'
})
export class SignUp implements ComponentInterface {
  @Prop() avatarUpload: boolean =  false;
  @Prop() i18n = i18n;
  @State() errors: any = {};
  @State() spinner = false;
  @Prop({mutable: true}) data: IRegister = {
    name: '',
    identifier: '',
    password: ''
  };
  @State() passwordVisible = false;
  @State() placeholder: string|undefined;
  @State() acceptTerms = false;
  @State() loadingByIndicator: string[] = [];
  @Event() signUpSuccess: EventEmitter|undefined;
  @Event() signUpProgress: EventEmitter|undefined;
  @Event() signUpNotApproved: EventEmitter|undefined;

  @Element() el!: HTMLElement;
  files: Set<ITransfer> = new Set();
  private subscriptions: Subscription[] = [];
  private passwordEl: HTMLInputElement|undefined;

  @Method()
  async resetErrors() {
    this.errors = {};
  }

  disconnectedCallback() {
    this.subscriptions.forEach((subscription: Subscription, index) => {
      subscription.unsubscribe();
      this.subscriptions.splice(index, 1);
    })
  }

  setSignUpByType(type: string) {
    this.loadingByIndicator.push(type);
    this.loadingByIndicator = [...this.loadingByIndicator];
  }

  async selected(event:CustomEvent) {
    const file = event.detail[0];
    this.spinner = true;
    const avatarFile = await Compress(file, null, 1024);
    if(avatarFile) {
      const data: OverlayEventDetail = await FileStackCropper(avatarFile);
      if (data) {
        this.placeholder = URL.createObjectURL(data.data.blob);
        this.files.add(new Transfer().deserialize({
          file: avatarFile,
          exIf: {
            crop: data.data.cropperPosition,
            categories: ['avatar']
          }
        }));
      }
    }
    this.spinner = false;
  }

  register(event: Event) {
    event.preventDefault();
    if(this.signUpProgress) {
      this.signUpProgress.emit(true);
    }
    this.setSignUpByType('signUp');
    this.subscriptions.push(AuthService.register(
      this.data.identifier?.trim(),
      this.data.password?.trim(),
      null,
      this.data.name?.trim(),
      StorageService.get("ext_id")
    ).pipe(first()).subscribe({
      next: async (authResponse) => {
        setTimeout(async () => {
            this.signUpSuccess?.emit(true);
            this.signUpProgress?.emit(false);
          await ToastService.presentToast(
            this.i18n.identifier.confirm.message,
            this.i18n.identifier.confirm.button,
            null,
            'success');
        }, 200);
        setTimeout(() => {
          this.loadingByIndicator = [];
        }, 1000);
        if (this.files.size > 0) {
          await InitChunkUpload(
            `${SetupService.config.REST_API}/user/${authResponse.user._id}/avatar`,
            new Credentials().deserialize(StorageService.get('credentials')),
            Array.from(this.files),
            (response:any) => {
              if (response.complete) {
                const accountWithAvatar = new User().deserialize(
                  Object.assign(authResponse.user, {
                    avatar: response
                  }));
                AccountService.set(accountWithAvatar, true);
                this.files.clear();
              }
            });
        }
      }, error: (error) => {
          this.signUpSuccess?.emit(false);
          this.signUpProgress?.emit(false);
          this.loadingByIndicator = [];
          this.errors = error?.errors;
      }
    }));
  }

  handleInput(event:any) {
    this.errors = {};
    if (event.target.name === "email") {
      this.data["identifier"] = event.target.value;
    } else {
      const key: UserRegisterAllowedKeys = event.target.name;
      this.data[key] = event.target.value;
    }
  }

  accept(event:CustomEvent) {
    this.acceptTerms = event.detail.checked;
  }

  render() {
    return [<form onSubmit={(event) => this.register(event)} novalidate={true}>
      <ion-list>
        {(this.avatarUpload) &&
          <ion-item lines="none" class="ion-no-margin ion-no-padding">
            <flx-file-upload accept="image/*" onSelected={event => this.selected(event)}>
              <flx-file-stack-avatar placeholder={this.placeholder} width={150} height={150}>
                {(this.spinner)
                  ? <ion-button mode="md" color="secondary">
                    <ion-spinner>
                    </ion-spinner>
                  </ion-button>
                  : <ion-button mode="md" color="secondary">
                    <ion-icon name="camera">
                    </ion-icon>
                  </ion-button>
                }
              </flx-file-stack-avatar>
            </flx-file-upload>
          </ion-item>
        }
        <div class="form-container">
          <div class="input">
            <input onInput={(event) => this.handleInput(event)} type="text" value={this.data.name} name="name"
                   class="input-field" required/>
            <label class="input-label">{this.i18n.name.label}</label>
          </div>
          <flx-auth-info-item icon="information-circle-outline" color="danger"
                          infos={ConvertServerError(this.errors?.name, this.i18n.name.errors)}/>
          <div class="input">
            <input name="email" onInput={(event) => this.handleInput(event)} type="email" value={this.data.identifier}
                   class="input-field" required/>
            <label class="input-label">{this.i18n.identifier.label}</label>
          </div>
          <flx-auth-info-item icon="information-circle-outline" color="danger"
                          infos={ConvertServerError(this.errors?.identifier, this.i18n.identifier.errors)}/>
          <div class="input">
            <input name="password" ref={ref => this.passwordEl = ref} onInput={(event) => this.handleInput(event)}
                   type="password"
                   value={this.data.password}
                   class="input-field password" required/>
            <label class="input-label">{this.i18n.password.label}</label>
            <ion-buttons class="password-eye" slot="end">
              <ion-button mode="md" slot="icon-only" onClick={(event) => {
                event.preventDefault();
                if(this.passwordEl) {
                  if (this.passwordEl?.type === "password") {
                    this.passwordEl.type = 'input';
                    this.passwordVisible = true;
                  } else {
                    this.passwordEl.type = 'password';
                    this.passwordVisible = false;
                  }
                }
              }}>
                <ion-icon
                  color={(!this.passwordVisible) ? 'success' : 'danger'}
                  name={(!this.passwordVisible) ? 'eye-off-outline' : 'eye-outline'}>
                </ion-icon>
              </ion-button>
            </ion-buttons>
          </div>
          <flx-auth-info-item icon="information-circle-outline" color="danger"
                          infos={ConvertServerError(this.errors?.password, this.i18n.password.errors)}/>
        </div>
      </ion-list>
      <ion-item lines="none" class="terms">
        <ion-toggle slot="start" color="secondary" onIonChange={(event) => this.accept(event)}>
        </ion-toggle>
        <ion-label mode="md"
                   class="ion-text-wrap">{this.i18n.confirm}
        </ion-label>
      </ion-item>
      <ion-button mode="md" class="submit-button"
                  disabled={!this.acceptTerms || (this.loadingByIndicator.indexOf('login') !== -1)} color="secondary"
                  type="submit" expand="block">
        <ion-label mode="md">{this.i18n.signUp}</ion-label>
        {(this.loadingByIndicator.indexOf('signUp') !== -1) &&
          <ion-spinner name="crescent" slot="end">
          </ion-spinner>
        }
      </ion-button>
      <input type="submit" disabled={!this.acceptTerms || (this.loadingByIndicator.indexOf('login') !== -1)}
             value={this.i18n.signUp} style={{display: 'none'}}>
      </input>
    </form>
    ]
  }
}
