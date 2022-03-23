import {Component, ComponentInterface, Element, Event, EventEmitter, h, Method, Prop, State} from '@stencil/core';
import {ITransfer} from '../../../interfaces/transfer';
import {AccountService} from '../../../services/account.service';
import {ModalService} from '../../../services/modal.service';
import {InitChunkUpload} from '../../../helpers/upload-utils';
import {Credentials} from '../../../interfaces/credentials';
import {StorageService} from '../../../services/storage.service';
import {FileStack, IFileStack} from '../../../interfaces/filestack';
import {IUser} from '../../../interfaces/user';
import {lastValueFrom, Observable} from 'rxjs';
import {i18n} from '../../../services/i18n.service';
import {TransferService} from "../../../services/transfer.service";
import {environment} from "../../../services/environment.service";

@Component({
  tag: 'file-stack-transfer',
  styleUrl: 'stack-transfer.scss',
  shadow: true
})
export class StackTransfer implements ComponentInterface {

  @Prop() account: IUser;
  @State() transfer: ITransfer[] = [];
  @State() progress: number = 0;
  @Element() el!: HTMLElement;
  @Event() uploadFinished: EventEmitter;
  private uploadFinishedCount = 0;

  @Method()
  async openUploadMenu() {
      const observer = new Observable<any>((observer) => {
        if (this.account) {
          if (AccountService.hasStatus('free')) {
            ModalService.openModal(
              'modal-upload',
              {
                changeUploadType: false
              },
              'modal-upload',
              false,
              true
            ).then((data) => {
              if (data?.role === 'upload') {
                this.uploadProcess(data).then(() => {
                  AccountService.sync();
                  observer.next(data);
                  observer.complete();
                });
              }
            }, (error) => {
              observer.error({type: "upload", error});
              observer.complete();
            });
          } else {
            AccountService.MessageForConfirmState().then(() => {
            }, (error) => {
              observer.error({type: "messageNotConfirm", error});
              observer.complete();
            });
          }
        } else {
          observer.error({type: "noAccount"});
          observer.complete();
        }
      });
      return lastValueFrom(observer);
    }

  async uploadProcess(data) {
    const transfer: ITransfer[] = await TransferService.createTransfer(Array.from(data.data));
    this.transfer = this.transfer.concat(transfer);
    this.transfer = [...this.transfer];
    this.uploadFinishedCount = this.transfer.length;
    await InitChunkUpload(
      `${environment.REST_API}/user/${this.account?._id}/file-stack`,
      new Credentials().deserialize(StorageService.get('credentials')),
      transfer,
      (response) => {
        this.uploadResponseHandler(response)
      },
      (loaded, total) => {
        this.setProcess(loaded / total);
      },
      (error) => {
        throw new Error(error);
      });
  }

  setProcess(process) {
    if (this.el) {
      const progressBar: HTMLIonProgressBarElement = this.el.shadowRoot.querySelector("ion-progress-bar");
      if (progressBar) {
        progressBar.value = process;
      }
    }
  }

  uploadResponseHandler(response: IFileStack) {
    if (response.complete) {
      this.uploadFinishedCount = (this.uploadFinishedCount - 1);
      if (this.uploadFinishedCount === 0) {
        setTimeout(() => {
          this.transfer = [];
          this.uploadFinished.emit(new FileStack().deserialize(Object.assign(response, {user: this.account})));
        }, 3000);
      }
    }
  }

  render() {
    return this.transfer.length > 0 && (
      <ion-item class="transfer" lines="none">
        <ion-avatar slot="start" style={{position: "relative"}}>
          {this.transfer.map((transfer$, index) =>
            transfer$?.thumbnail ?
              <ion-img style={{position: "absolute", top: "0px", left: index * 10 + "px"}} src={transfer$.thumbnail}>
              </ion-img>
              : <div class="preview">
                <ion-icon name="videocam-outline">
                </ion-icon>
              </div>
          )}
        </ion-avatar>
        {(this.uploadFinishedCount > 0) &&
          <ion-progress-bar>
          </ion-progress-bar>
        }
        {(this.uploadFinishedCount === 0) &&
          <ion-label mode="md" style={{paddingLeft: "5px"}}>{i18n('Almost done')
            .t('de', 'Gleich fertig').get()}</ion-label>
        }
        {(this.uploadFinishedCount === 0) &&
          <ion-icon name="timer-outline">
          </ion-icon>
        }
      </ion-item>
    );
  }

}
