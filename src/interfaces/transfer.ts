import {Deserializable} from './deserialize';
import {IExIf} from './exIf';
import {UniqueID} from '../helpers/string-utils';

export interface ITransfer {
  guid?: string;
  id?: string;
  transferId?: string;
  file?: File | Blob;
  name?: string;
  description?: string;
  width?: number;
  height?: number;
  tag?: string[];
  path?: string;
  thumbnail?: string;
  collection?: string;
  exIf?: IExIf;
}

export class Transfer implements ITransfer, Deserializable {
  guid: string;
  id: string;
  transferId?: string;
  file?: File | Blob;
  path: string;
  thumbnail: string;
  name: string;
  width?: number;
  height?: number;
  description?: string;
  tag?: string[];
  collection?: string;
  exIf: IExIf;

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
