import {ToastService} from '../services/toast.service';


export const LoggedOutToast = (message = 'You have been logged out because your session is no longer valid!') => {
  return ToastService.presentToast(
    message,
    null,
    5000,
    'danger');
}

export const SuccessToast = (message, duration = null) => {
  return ToastService.presentToast(
    message,
    "Okay",
    duration,
    'success'
  );
}

export const ErrorToast = (message, duration = null) => {
  return ToastService.presentToast(
    message,
    "Okay",
    duration,
    'danger'
  );
}

