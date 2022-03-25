import {Deserializable} from './deserialize';
import {UniqueID} from '../helpers/string-utils';

export interface ITransfer {
  guid?: string;
  id?: string;
  transferId?: string;
  file?: File;
  name?: string;
  description?: string;
  width?: number;
  height?: number;
  tag?: string[];
  path?: string;
  thumbnail?: string;
  collection?: string;
  exIf?: any;
}

export class Transfer implements ITransfer, Deserializable {
  guid?: string;
  id?: string;
  transferId?: string;
  file?: File;
  path?: string;
  thumbnail?: string;
  name?: string;
  width?: number;
  height?: number;
  description?: string;
  tag?: string[];
  collection?: string;
  exIf?: any;

  deserialize(input: ITransfer) {
    if (!input.guid) {
      input.guid = UniqueID();
    }
    if (input) {
      Object.assign(this, input);
    }

    return this;
  }
}
