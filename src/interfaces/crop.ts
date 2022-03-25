import {Deserializable} from './deserialize';

export interface ICrop {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export class Crop implements ICrop, Deserializable {
  x1: number = 0;
  y1: number = 0;
  x2: number = 0;
  y2: number = 0;

  deserialize(input: any) {
    if (input) {
      Object.assign(this, input);
    }
    return this;
  }
}
