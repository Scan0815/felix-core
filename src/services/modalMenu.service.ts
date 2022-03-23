import {ModalService} from './modal.service';
import {IMenuHeader} from '../interfaces/menu-header';
import {IMenuOption} from '../interfaces/menu-option';

class ModalMenuServiceController {

  async openMenu(header: IMenuHeader, options: IMenuOption[], footer?: IMenuOption): Promise<any> {

    const component = "modal-menu";
    const componentProps = {
      header,
      options,
      footer,
      type: 'modal'
    };

    return ModalService.openModal(
      component,
      componentProps,
      'modal-menu',
      true,
      true
    );
  }

  async closeMenu(data?, role?) {
    return ModalService.closeModal(data, role);
  }

}

export const ModalMenuService = new ModalMenuServiceController();
