import {RouterDirection} from '@ionic/core';
import {ToastService} from '../services/toast.service';
import {AuthService} from '../services/auth.service';
import {FixedEncodeURIComponent} from './string-utils';
import {LoggedOutToast} from './default-toasts';
import {i18n} from "../services/i18n.service";

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


export const RouterNavigate = async (path, direction: RouterDirection = 'forward') => {
  const ionRouterElement: HTMLIonRouterElement = document.querySelector('ion-router');
  if (ionRouterElement) {
    return ionRouterElement.push(path, direction)
  } else {
    location.href = path;
  }
};

export const OpenUrl = (event) => {
  event.preventDefault();
  event.stopPropagation();
  const href = event.currentTarget.querySelector('a').getAttribute("href");
  RouterNavigate(href, 'forward').then();
}

export const RouterBack = () => {
  const ionRouterElement: HTMLIonRouterElement = document.querySelector('ion-router');
  if (ionRouterElement) {
    return ionRouterElement.back();
  } else {
    history.back();
  }
};

export const RouterCanNavGoBackThenGo = async () => {
  const nav: HTMLIonNavElement = document.querySelector('ion-nav');
  if (nav && await nav.canGoBack()) {
    return nav.pop({skipIfBusy: true});
  }
  return RouterNavigate("/", 'back').then();
};

export const RouterOpenNotification = (event?) => {
  if (event) {
    event.preventDefault();
  }
  RouterNavigate('/notification').then()
};

export const RouterOpenChat = (event?) => {
  if (event) {
    event.preventDefault();
  }
  RouterNavigate('/chat').then()
};

export const RouterOpenPayment = (event?) => {
  if (event) {
    event.preventDefault();
  }
  const successUrl = location.href.split('?')[0];
  RouterNavigate('/payment/' + btoa(FixedEncodeURIComponent(successUrl))).then();
};

export const RouterGetUriParam = (name) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  if (urlParams.has(name)) {
    return urlParams.get(name);
  } else {
    return null;
  }
};

export const LogoutErrorHandling = (error => {
  switch (error?.systemCode) {
    case "authenticationheaderisinvalid":
    case "authenticationhasfailed":
      LoggedOutToast().then(
        () => {
          AuthService.logout().then(() => {
            location.href = '/login';
          }, () => {
            location.href = '/login';
          });
        });
      break;
  }
});


export const RouterErrorHandling = (error, handler = () => {
  location.reload();
}) => {
  switch (error?.systemCode) {
    case "accountwasnotfound":
    case "inputdatanotvalid":
      break
    case "authenticationheaderisinvalid":
    case "authenticationhasfailed":
      LoggedOutToast().then(
        () => {
          AuthService.logout().then(() => {
            location.href = '/login';
          }, () => {
            location.href = '/login';
          });
        });
      break;
    default:
      ToastService.presentToastWithButtons(
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
          }], null, 'bottom', 'secondary').then()
  }


};
