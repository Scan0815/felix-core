import {Deserializable} from './deserialize';
import {ExIf, IExIf} from './exIf';
import {IUser, User} from './user';
import {ICrop} from './crop';
import {IComment} from './comment';

export type TFileStackStatus = 'pending' | 'saving' | 'saved' | 'uploaded' | 'uploading' | 'converting' |
  'converting_async' | 'converting_async_error' | 'converted' | 'available' | 'error' | 'archived';

export type TFileStackType = 'video' | 'image';

export interface IFileStackBuyResult {
  role: 'buy' | 'subscribe' | 'booked',
  fileStack: IFileStack
}


export interface IFileStackSearchCriteria {
  tag?: string[],
  contentType?: TFileStackType[],
  ids?: string[],
  status?: string,
  states?: string,
  annotation?: string,
  user_id?: string,
  user_ids?: string[],
  exclude_ids?: string[],
  categories?: string[],
  search?: string,
  private?: boolean,
  range?: string,
  collection_id?: string,
  name?: string,
  location?: string,
  price?: number,
  price_gt?: string,
  price_lt?: string,
  score?: string,
  score_lt?: string,
  score_gt?: string,
  safe_search?: boolean,
  user_verified?: boolean,
  views_count?: string,
  views_count_gt?: string,
  views_count_lt?: string,
  likes_count?: string,
  likes_count_gt?: string,
  likes_count_lt?: string,
  sales_count?: string,
  sales_count_gt?: string,
  sales_count_lt?: string,
  created_at_gt?: string,
  created_at_gt_ms?: string,
  created_at_gte?: string,
  created_at_lt?: string,
  created_at_lte?: string,
  update_at_gt?: string,
  update_at_gt_ms?: string,
  update_at_gte?: string,
  update_at_lt?: string,
  update_at_lte?: string,
  width?: number,
  width_gt?: number,
  width_lt?: number,
  height?: number,
  height_gt?: number,
  height_lt?: number,
}

export interface IFileStackUpdate {
  name?: string;
  description?: string;
  location?: string;
  tag?: string[];
  price?: number;
}

export interface IFileStack extends IExIf {
  _id: string;
  code: string;
  type: string;
  complete?: boolean
  updated_at: string;
  created_at: string;
  transferId?: string;
  name?: string;
  width: number;
  height: number;
  extension: string;
  user?: IUser;
  crop?: ICrop;
  size?: number;
  base_price?: number;
  price_modification?: string;
  status?: TFileStackStatus;
  comments_count?: number;
  last_comment?: IComment;
  first_three_comments?: IComment[];
  views_count?: number;
  likes_count?: number;
  tripSelected?: boolean;
  collection?: IFileStack[];
  collectionId?: string;
  collection_id?: string;
  user_paid?: string[];
  token?: { [key: string]: string };
  price?: number;
  dominantColor: number[];
  like_user_ids?: string[];
  purchased?: boolean;
  duration?: number;
  delete?: boolean;
  own?: boolean;
}

export class FileStack extends ExIf implements Deserializable, IFileStack {
  _id: string;
  code: string;
  type: string;
  updated_at: string;
  created_at: string;
  complete?: boolean;
  transferId?: string;
  name: string;
  width: number;
  height: number;
  extension: string;
  crop: ICrop;
  user?: IUser;
  price?: number;
  size?: number;
  status?: TFileStackStatus;
  comments_count?: number;
  base_price?: number;
  price_modification?: string;
  last_comment?: IComment;
  first_three_comments?: IComment[];
  collection?: IFileStack[];
  collectionId?: string;
  collection_id?: string;
  views_count?: number;
  likes_count?: number;
  user_paid?: string[];
  tripSelected?: boolean;
  dominantColor: number[];
  like_user_ids?: string[];
  token?: { [key: string]: string };
  purchased?: boolean;
  duration?: number;
  delete?: boolean;
  own?: boolean;

  deserialize(input: IFileStack) {

    if (!input) {
      return this;
    }

    if (input) {
      Object.assign(this, input);
    }
    if (input) {
      Object.assign(this, super.deserialize(input));
    }
    if (input.hasOwnProperty('user')) {
      this.user = new User().deserialize(input.user);
    }

    if (input.hasOwnProperty('purchased')) {
      this.purchased = (input.purchased);
    } else {
      this.purchased = false;
    }

    if (!this.views_count) {
      this.views_count = 1;
    }

    if (this.crop) {
      this.width = this.crop.x2 - this.crop.x1;
      this.height = this.crop.y2 - this.crop.y1;
    }

    if (input.hasOwnProperty('collection_id')) {
      this.collectionId = input.collection_id;
    }

    if (input.collection?.length > 0) {
      this.collection = input.collection.map((item) => {
        item.collectionId = this._id;
        return new FileStack().deserialize(item);
      });
    }

    if (!this.crop && this.orientation
      && (4 < this.orientation
        && this.orientation < 9
        && this.width > this.height)
    ) {
      const size = this.height;
      const h = this.width;
      this.width = size;
      this.height = h;
    }

    return this;
  }
}
