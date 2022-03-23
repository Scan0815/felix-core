import '@ionic/core';

//Interfaces
export * from './interfaces/user';
export * from './interfaces/avatar';
export * from './interfaces/filestack';
export * from './interfaces/role';
export * from './interfaces/env';
export * from './interfaces/menu-header';
export * from './interfaces/menu-option';
export * from './interfaces/icon';
export * from './interfaces/IonicColor';

//Helpers
export * from './helpers/default-toasts';
export * from './helpers/default-alerts';
export * from './helpers/router.utils';

//Services
export * from "./services/environment.service";
export * from "./services/account.service";
export * from "./services/storage.service";
export * from "./services/toast.service";
export * from "./services/auth.service";
export * from "./services/i18n.service";
export * from "./services/rest.service";
export * from "./services/modal.service";
export * from "./services/modalMenu.service";

export { Components, JSX } from './components';
