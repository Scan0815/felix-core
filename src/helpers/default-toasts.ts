import {ToastService} from "../services/toast.service";


export const LoggedOutToast = (message = 'You have been logged out because your session is no longer valid!') => {
  return ToastService.presentToast(
    message,
    null,
    5000,
    'danger');
}

export const SuccessToast = (message:string, duration:number|null = null, position: 'top' | 'bottom' | 'middle' = 'top') => {
  return ToastService.presentToast(
    message,
    "Okay",
    duration,
    'success',
    position
  );
}

export const ErrorToast = (message:string, duration:number|null = null, position: 'top' | 'bottom' | 'middle' = 'top') => {
  return ToastService.presentToast(
    message,
    'Okay',
    duration,
    'danger',
    position
  );
}

