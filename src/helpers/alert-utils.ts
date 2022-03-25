export const AlertConfirm = (title: string, message: string, okay: Function = () => {
}, cancel: Function = () => {
}, okayText = 'okay', cancelText = 'cancel', cancelRole = 'cancel') => {
  const alert: any = document.createElement('ion-alert');
  alert.header = title;
  alert.message = message;
  alert.buttons = [
    {
      text: cancelText,
      role: cancelRole,
      cssClass: 'secondary',
      handler: (event:any) => {
        cancel(event)
      }
    }, {
      text: okayText,
      handler: (event:any) => {
        okay(event)
      }
    }
  ];
  document.body.appendChild(alert);
  return alert.present();
};

export const Alert = (title: string, message: string, okayText = 'okay', cancelText = 'cancel') => {
  const alert: any = document.createElement('ion-alert');
  alert.header = title;
  alert.message = message;
  alert.buttons = [okayText, cancelText];
  document.body.appendChild(alert);
  return alert.present();
};
