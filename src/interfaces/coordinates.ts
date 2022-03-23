import {Deserializable} from './deserialize';

export interface ICoordinate {
  type: string;
  coordinates: number[];
}

export class Coordinates implements ICoordinate, Deserializable {
  type: string;
  coordinates: number[];

  deserialize(input: any) {
    if (input) {
      Object.assign(this, input);
    }
    return this;
  }
}
