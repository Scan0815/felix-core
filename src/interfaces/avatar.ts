import {FileStack, IFileStack, TFileStackStatus} from './filestack';
import {Deserializable} from './deserialize';
import {ICrop} from './crop';
import {IUser} from './user';
import {IComment} from './comment';

export interface IAvatar extends IFileStack {
}

export class Avatar implements IAvatar, Deserializable {
  _id: string = '';
  code: string = '';
  type: string = '';
  updated_at: string = '';
  created_at: string = '';
  complete?: boolean
  name: string = '';
  width: number = 0;
  height: number = 0;
  extension: string = '';
  crop?: ICrop;
  user: IUser|null = null;
  price?: number;
  size?: number;
  status?: TFileStackStatus;
  comments_count?: number;
  last_comment?: IComment;
  collection?: IFileStack[];
  collectionId?: string;
  collection_id?: string;
  views_count?: number;
  likes_count?: number;
  tripSelected?: boolean;
  dominantColor: number[] = [];
  like_user_ids?: string[];
  purchased?: boolean;
  duration?: number;
  delete?: boolean;
  own?: boolean;

  deserialize(input: IAvatar|null) {
    if (input) {
      Object.assign(this, new FileStack().deserialize(input));
    }
    return this;
  }
}
