import {AnimationBuilder, modalController} from "@ionic/core";
import {PageProcessService} from './pageProcess.service';
import {UniqueID} from '../helpers/string-utils';

class ModalServiceController {

  async openModal(component,
                  componentProps?,
                  cssClass?,
                  backdropDismiss = true,
                  showBackdrop = true,
                  keyboardClose = true,
                  enterAnimation: AnimationBuilder = null,
                  leaveAnimation: AnimationBuilder = null): Promise<any> {

    return new Promise<any>(async (resolve) => {

      PageProcessService.start();

      const id = UniqueID();

      window.history.pushState({component: component, modal: true}, null);

      const modal = await modalController.create({
        component,
        cssClass,
        backdropDismiss,
        showBackdrop,
        id,
        presentingElement: document.querySelector('ion-nav'),
        enterAnimation,
        leaveAnimation,
        keyboardClose,
        mode: 'md',
        swipeToClose: backdropDismiss
      });
      modal.componentProps = componentProps;
      modal.onDidDismiss().then((data) => {
        if (data.data) {
          resolve(data);
        } else {
          resolve(null);
        }
      });

      modal.onWillDismiss().then(data => {
        if (window?.history?.state?.modal
          && data?.role !== "closeHistory") {
          history.back();
        }
      });

      await modal.present().then(() => {
        PageProcessService.stop();
      });
    });
  }

  async closeModal(data?, role?) {
    const modals = document.querySelectorAll('ion-modal.show-modal:not(.dirty)');
    const index = (modals.length - 1);
    const modal: any = modals.item(index);
    if (modal) {
      await modal.dismiss(data, role);
    }
  }

}

export const ModalService = new ModalServiceController();
