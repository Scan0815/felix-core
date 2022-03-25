import {AlertConfirm} from './alert-utils';
import {RouterNavigate} from './router-utils';
import {i18n} from "../services/i18n.service";

export const NotLoggedInAlert = () => {
  return AlertConfirm(i18n('Login required!')
      .t('de', 'Login erforderlich!').get(),
    i18n('New to us? Register free now or log in if you already have an account.')
      .t('de', 'Neu hier? Registriere dich jetzt kostenlos oder logge dich ein, wenn du bereits ein Konto besitzt.').get(),
    () => {
      RouterNavigate('/sign-up').then();
    }, () => {
      RouterNavigate('/login').then();
    }, i18n('Signup')
      .t('de', 'registrieren').get(),
    i18n('login')
      .t('de', 'Login').get(),
    'login');
}
