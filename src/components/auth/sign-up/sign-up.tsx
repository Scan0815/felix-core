import {Component, ComponentInterface, Element, Event, EventEmitter, h, Prop, State, Watch} from '@stencil/core';
import {FileStackCropper} from '../../../helpers/file-stack-utils';
import {AuthService} from '../../../services/auth.service';
import {OverlayEventDetail} from '@ionic/core';
import {ToastService} from '../../../services/toast.service';
import {ITransfer, Transfer} from '../../../interfaces/transfer';
import {IRegister, User} from '../../../interfaces/user';
import {AccountService} from '../../../services/account.service';
import {Credentials} from '../../../interfaces/credentials';
import {StorageService} from '../../../services/storage.service';
import {InitChunkUpload} from '../../../helpers/upload-utils';
import {Compress} from '../../../helpers/image-utils';
import {ConvertServerError} from '../../../helpers/string-utils';
import {Subscription} from "rxjs";
import {environment} from "../../../services/environment.service";
import i18n from "./i18n.json";

@Component({
  tag: 'auth-sign-up',
  styleUrl: 'sign-up.scss'
})
export class SignUp implements ComponentInterface {
  @Prop() resetErrors: number;
  @Prop() avatarUpload: false;
  @Prop() i18n = i18n
  @State() errors: any = {};
  @State() spinner = false;
  @Prop({mutable: true}) data: IRegister = {
    name: '',
    identifier: '',
    password: ''
  };
  @State() passwordVisible = false;
  @State() placeholder: string;
  @State() acceptTerms = false;
  @State() loadingByIndicator: string[] = [];
  @Event() signUpSuccess: EventEmitter;
  @Event() signUpProgress: EventEmitter;
  @Event() signUpNotApproved: EventEmitter;

  @Element() el!: HTMLElement;
  files: Set<ITransfer> = new Set();
  private subscriptions: Subscription[] = [];
  private passwordEl: HTMLInputElement;

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

  setSignUpByType(type: string) {
    this.loadingByIndicator.push(type);
    this.loadingByIndicator = [...this.loadingByIndicator];
  }

  selected(event) {
    const file = event.detail[0];
    this.spinner = true;
      Compress(file, null, 1024).then((avatarFile) => {
        FileStackCropper(avatarFile).then((data: OverlayEventDetail) => {
          if (data) {
            this.placeholder = URL.createObjectURL(data.data.blob);
            this.files.add(new Transfer().deserialize({
              file: avatarFile,
              exIf: {
                categories: ['avatar']
              }
            }));
          }
          this.spinner = false;
        });
    });
  }

  register(event) {
    event.preventDefault();
    this.signUpProgress.emit(true);
    this.setSignUpByType('signUp');
    this.subscriptions.push(AuthService.register(
      this.data.identifier?.trim(),
      this.data.password?.trim(),
      null,
      this.data.name?.trim(),
      StorageService.get("ext_id")
    ).subscribe({
      next: async (authResponse) => {
        setTimeout(async () => {
          this.signUpSuccess.emit(true);
          this.signUpProgress.emit(false);
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
            `${environment.REST_API}/user/${authResponse.user._id}/avatar`,
            new Credentials().deserialize(StorageService.get('credentials')),
            Array.from(this.files),
            (response) => {
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
        this.signUpSuccess.emit(false);
        this.signUpProgress.emit(false);
        this.loadingByIndicator = [];
        this.errors = error?.errors;
      }
    }));
  }

  handleInput(event) {
    this.errors = {};
    if (event.target.name === "email") {
      this.data["identifier"] = event.target.value;
    } else {
      this.data[event.target.name] = event.target.value;
    }
  }

  accept(event) {
    this.acceptTerms = event.detail.checked;
  }

  render() {
    return [<form onSubmit={(event) => this.register(event)} novalidate>
      <ion-list>
        {(this.avatarUpload) &&
          <ion-item lines="none" class="ion-no-margin ion-no-padding">
            <file-upload accept="image/*" onSelected={(event) => {
              this.selected(event)
            }}>
              <file-stack-avatar placeholder={this.placeholder} width={150} height={150}>
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
              </file-stack-avatar>
            </file-upload>
          </ion-item>
        }
        <div class="form-container">
          <div class="input">
            <input onInput={(event) => this.handleInput(event)} value={this.data.name} name="name" type="text"
                   class="input-field" required/>
            <label class="input-label">{this.i18n.name.label}</label>
          </div>
          <form-info-item icon="information-circle-outline" color="danger"
                          infos={ConvertServerError(this.errors?.name, this.i18n.name.errors)}>
          </form-info-item>
          <div class="input">
            <input name="email" onInput={(event) => this.handleInput(event)} value={this.data.identifier} type="email"
                   class="input-field" required/>
            <label class="input-label">{this.i18n.identifier.label}</label>
          </div>
          <form-info-item icon="information-circle-outline" color="danger"
                          infos={ConvertServerError(this.errors?.identifier, this.i18n.identifier.errors)}>
          </form-info-item>
          <div class="input">
            <input name="password" ref={ref => this.passwordEl = ref} onInput={(event) => this.handleInput(event)}
                   value={this.data.password}
                   type="password" class="input-field password" required/>
            <label class="input-label">{this.i18n.password.label}</label>
            <ion-buttons class="password-eye" slot="end">
              <ion-button mode="md" slot="icon-only" onClick={(event) => {
                event.preventDefault();
                if (this.passwordEl?.type === "password") {
                  this.passwordEl.type = 'input';
                  this.passwordVisible = true;
                } else {
                  this.passwordEl.type = 'password';
                  this.passwordVisible = false;
                }
              }}>
                <ion-icon
                  color={(!this.passwordVisible) ? 'success' : 'danger'}
                  name={(!this.passwordVisible) ? 'eye-off-outline' : 'eye-outline'}>
                </ion-icon>
              </ion-button>
            </ion-buttons>
          </div>
          <form-info-item icon="information-circle-outline" color="danger"
                          infos={ConvertServerError(this.errors?.password, this.i18n.password.errors)}>
          </form-info-item>
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
