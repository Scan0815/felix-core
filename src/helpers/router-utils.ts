import {RouterDirection} from '@ionic/core';
import {LoggedOutToast} from './default-toasts';
import {AuthService} from "../services/auth.service";
import {i18n} from "../services/i18n.service";
import {ToastService} from "../services/toast.service";

export const GetDomain = () => {
  return location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
}


export const IsLoggedInGuard = () => {
  const isLoggedIn = AuthService.isLoggedInValue(); // Replace this with actual login validation
  if (isLoggedIn) {
    return true;
  } else {
    return {redirect: '/not-logged-in'}; // If a user is not logged in, they will be redirected to the /login page
  }
}


export const RouterNavigate = async (path:string, direction: RouterDirection = 'forward') => {
  const ionRouterElement: HTMLIonRouterElement|null = document.querySelector('ion-router');
  if (ionRouterElement) {
    return ionRouterElement.push(path, direction)
  } else {
    window.location.href = path;
    return null;
  }
};

export const RouterBack = () => {
  const ionRouterElement: HTMLIonRouterElement|null = document.querySelector('ion-router');
  if (ionRouterElement) {
    return ionRouterElement.back();
  } else {
    history.back();
    return null;
  }
};

export const RouterCanNavGoBackThenGo = async () => {
  const nav: HTMLIonNavElement|null = document.querySelector('ion-nav');
  if (nav && await nav.canGoBack()) {
    return nav.pop({skipIfBusy: true});
  }
  return RouterNavigate("/", 'back').then();
};

export const RouterOpenNotification = (event:Event) => {
  if (event) {
    event.preventDefault();
  }
  RouterNavigate('/notification').then()
};

export const RouterGetUriParam = (name:string) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  if (urlParams.has(name)) {
    return urlParams.get(name);
  } else {
    return null;
  }
};

export const LogoutErrorHandling = async (error:any) => {
  switch (error?.systemCode) {
    case "authenticationheaderisinvalid":
    case "authenticationhasfailed":
      try{
        await LoggedOutToast();
        await AuthService.logout();
        location.href = '/login';
      }catch (e) {
        location.href = '/login';
      }
      break;
  }
};


export const RouterErrorHandling = async (error:any, handler = () => {
  location.reload();
}) => {
  switch (error?.systemCode) {
    case "accountwasnotfound":
    case "inputdatanotvalid":
      break
    case "authenticationheaderisinvalid":
    case "authenticationhasfailed":
      try{
        await LoggedOutToast();
        await AuthService.logout();
        location.href = '/login';
      }catch (e) {
        location.href = '/login';
      }
      break;
    default:
      await ToastService.presentToastWithButtons(
        'Problem',
        (error?.systemCode) ? i18n(':message (:systemCode)').get(null, {
          ':systemCode': error?.systemCode,
          ':message': error?.message
        }) : i18n('There was a problem with your connection.')
          .t('de', 'Es gab ein Problem mit deiner Verbindung').get(), [
          {
            text: i18n('refresh')
              .t('de', 'aktualisieren').get(),
            handler
          }], null, 'bottom', 'secondary');
  }
};
