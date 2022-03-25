import {Deserializable} from './deserialize';
import {IonicColor} from './IonicColor';

export interface IMenuHeader {
  title: string|null;
  icon?: string;
  color?: IonicColor;
}

export class MenuHeader implements IMenuHeader, Deserializable {
  title: string|null = null;
  icon?: string;
  color?: IonicColor;

  deserialize(input: IMenuHeader) {
    if (input) {
      Object.assign(this, input);
    }
    return this;
  }
}
