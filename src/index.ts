import '@ionic/core';

//Interfaces
export {IUser,IRegister,UserStatus,User} from './interfaces/user';
export {IAvatar,Avatar} from './interfaces/avatar';
export {IFileStack,FileStack} from './interfaces/filestack';
export {IRole,Role} from './interfaces/role';
export {IEnv} from './interfaces/env';
export {MenuHeader,IMenuHeader} from './interfaces/menu-header';
export {IMenuOption,MenuOption} from './interfaces/menu-option';
export {Icon,IIcon} from './interfaces/icon';
export {IonicColor} from './interfaces/IonicColor';

//Helpers
export {SuccessToast,ErrorToast,LoggedOutToast} from './helpers/default-toasts';
export {NotLoggedInAlert} from './helpers/default-alerts';
export {IsLoggedInGuard,RouterNavigate,RouterCanNavGoBackThenGo,RouterErrorHandling,RouterGetUriParam} from './helpers/router.utils';

//Services
export {environment} from "./services/environment.service";
export {AccountService} from "./services/account.service";
export {StorageService} from "./services/storage.service";
export {ToastService} from "./services/toast.service";
export {AuthService} from "./services/auth.service";
export {i18n} from "./services/i18n.service";
export {RestService} from "./services/rest.service";
export {ModalService} from "./services/modal.service";
export {ModalMenuService} from "./services/modalMenu.service";

export { Components, JSX } from './components';
