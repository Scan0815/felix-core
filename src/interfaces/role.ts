import {Deserializable} from './deserialize';

export interface IRole {
  name: string;
}

export class Role implements IRole, Deserializable {
  name: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}


