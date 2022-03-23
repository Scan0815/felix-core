import {Deserializable} from './deserialize';
import {IonicColor} from './IonicColor';

export interface IMenuOption {
  title: string;
  titleClass?: string;
  role?: string;
  data?: any;
  icon?: string;
  iconSrc?: string;
  href?: string;
  alert?: string;
  handler?: any;
  color?: IonicColor;
}

export class MenuOption implements IMenuOption, Deserializable {
  title: string;
  titleClass?: string;
  icon?: string;
  iconSrc?: string;
  role?: string;
  href?: string;
  alert?: string;
  color?: IonicColor;
  handler?: any;
  data?: any;

  deserialize(input: IMenuOption) {
    if (input) {
      Object.assign(this, input);
    }
    return this;
  }
}
