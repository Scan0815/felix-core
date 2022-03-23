import {Deserializable} from './deserialize';


export interface ICredentials {
  token: string;
  resource: string;
}

export class Credentials implements ICredentials, Deserializable {
  token: string;
  resource: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
