import {Deserializable} from './deserialize';
import {IUser, User} from './user';

export interface IComment {
  _id?: string;
  text: string;
  user?: IUser;
  file_stack_id?: string;
  updated_at?: string;
  created_at?: string;
}


export class Comment implements Deserializable, IComment {
  _id: string;
  text: string;
  user: IUser;
  file_stack_id: string;
  updated_at: string;
  created_at: string;

  deserialize(input: any) {
    if (input) {
      Object.assign(this, input);
    }
    if (input.hasOwnProperty('user') && input.user) {
      this.user = new User().deserialize(input.user);
    }
    return this;
  }
}
