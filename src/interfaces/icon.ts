import {Deserializable} from './deserialize';
import {IonicColor} from './IonicColor';
import {UniqueID} from '../helpers/string-utils';

type size = "small" | "default" | "large";
type fill = 'clear' | 'outline' | 'solid' | 'default';

export interface IIcon {
  fill?: fill;
  src?: string;
  id?: string;
  icon?: string;
  clickHandler?: any;
  initHandler?: any;
  size?: size;
  label?: string;
  count?: number;
  color?: IonicColor;
  buttonColor?: IonicColor
}

export class Icon implements IIcon, Deserializable {
  fill?: fill;
  id?: string;
  icon?: string;
  src?: string;
  clickHandler?: any;
  initHandler?: any;
  size?: size;
  label?: string;
  count?: number;
  color?: IonicColor;
  buttonColor?: IonicColor;

  deserialize(input: IIcon) {
    if (input) {
      Object.assign(this, input);
    }

    if (!this.id) {
      this.id = UniqueID();
    }

    return this;
  }
}
