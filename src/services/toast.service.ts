import {IonicColor} from '../interfaces/IonicColor';
import {ToastButton} from '@ionic/core';

class ToastServiceController {

  async presentToast(message:string, showButton:string|null = null, duration:number|null = 5000, color: IonicColor|null = null, position: 'top' | 'bottom' | 'middle' = 'bottom') {

    const toast = document.createElement('ion-toast');
    toast.message = message;
    if(color) {toast.color = color;}
    toast.duration = (duration !== null) ? duration : 5000;
    toast.position = position;
    toast.buttons = [(showButton) ? showButton : 'OK'];
    document.body.appendChild(toast);
    return toast.present();
  }

  async presentToastWithButtons(header:string, message:string, buttons: ToastButton[], duration:number|null = null, position: 'top' | 'bottom' | 'middle' = 'bottom', color: IonicColor = "primary") {
    const toast = document.createElement('ion-toast');
    toast.header = header;
    toast.message = message;
    toast.color = color;
    toast.duration = (duration !== null) ? duration : 5000;
    toast.position = position;
    toast.buttons = buttons;

    document.body.appendChild(toast);
    return toast.present();
  }
}

export const ToastService = new ToastServiceController();
