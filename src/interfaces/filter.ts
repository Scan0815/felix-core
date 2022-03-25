import {Deserializable} from './deserialize';
import {IonicColor} from './IonicColor';


type FilterColor = 'content-video' | 'content-image' | IonicColor;

export interface IFilter {
  selected: boolean;
  label: string;
  value: string;
  icon: string|null;
  iconSrc: string|null;
  color: FilterColor;
}

export class Filter implements IFilter, Deserializable {
  selected: boolean = false;
  label: string = '';
  value: string = '';
  icon: string|null = null;
  iconSrc: string|null = null;
  color: FilterColor = "primary";

  deserialize(input: IFilter) {
    if (input) {
      Object.assign(this, input);
    }
    return this;
  }
}
