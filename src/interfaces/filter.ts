import {Deserializable} from './deserialize';
import {IonicColor} from './IonicColor';


type FilterColor = 'content-video' | 'content-image' | IonicColor;

export interface IFilter {
  selected: boolean;
  label: string;
  value: string;
  icon?: string;
  iconSrc?: string;
  color: FilterColor;
}

export class Filter implements IFilter, Deserializable {
  selected: boolean;
  label: string;
  value: string;
  icon?: string;
  iconSrc?: string;
  color: FilterColor;

  deserialize(input: IFilter) {
    if (input) {
      Object.assign(this, input);
    }
    return this;
  }
}
