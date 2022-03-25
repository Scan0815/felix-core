import {Deserializable} from './deserialize';


export interface ICredentials {
  token: string|null;
  resource: string|null;
}

export class Credentials implements ICredentials, Deserializable {
  token: string|null = null;
  resource: string|null = null;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
