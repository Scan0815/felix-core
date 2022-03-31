import {ToastService} from "../services/toast.service";
import {i18n} from "../services/i18n.service";


export const LoggedOutToast = (message = 'You have been logged out because your session is no longer valid!') => {
  return ToastService.presentToast(
    message,
    null,
    5000,
    'danger');
}


export const DataSuccessfulUpdatedToast = () => {
  return SuccessToast(
    i18n('Your data was successfully updated!')
      .t('de', 'Deine Daten wurden erfolgreich aktualisiert!').get(),3000)
}

export const DataNotSuccessfulUpdatedToast = () => {
  return ErrorToast(
    i18n('Your data was not successfully updated!')
      .t('de', 'Deine Daten wurden nicht erfolgreich aktualisiert!').get(),3000)
}


export const SuccessToast = (message:string, duration:number|null = null) => {
  return ToastService.presentToast(
    message,
    "Okay",
    duration,
    'success'
  );
}

export const ErrorToast = (message:string, duration:number|null = null) => {
  return ToastService.presentToast(
    message,
    'Okay',
    duration,
    'danger'
  );
}

