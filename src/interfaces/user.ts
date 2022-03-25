import {IRole, Role} from './role';
import {Deserializable} from './deserialize';
import {Avatar, IAvatar} from './avatar';

export type UserStatus = 'free' | 'confirmation' | 'bounce' | 'deleted';
export type UserLoginAllowedKeys= 'identifier' | 'password';
export type UserRegisterAllowedKeys= 'identifier' | 'password' | 'name';
export type UserResetAllowedKeys= 'password' | 'retype';

export interface IReset {
  password: string,
  retype: string
}

export interface ILogin {
  identifier: string,
  password: string
}

export interface IRegister {
  name: string,
  identifier: string,
  password: string
}

export interface IUser {
  _id?: string;
  name?: string;
  identifier?: string;
  roles?: IRole[];
  avatar:  IAvatar|null;
  status?: UserStatus;
  updated_at?: string;
  created_at?: string;
}

export class User implements IUser, Deserializable {
  _id?: string;
  name?: string;
  identifier?: string;
  roles?: IRole[];
  avatar: IAvatar|null = null;
  status?: UserStatus;
  updated_at?: string;
  created_at?: string;

  deserialize(input: IUser|null) {
    if (input) {
      Object.assign(this, input);
      if (input.roles) {
        this.roles = input.roles.map((role: IRole) => new Role().deserialize(role));
      }
      if (input.avatar) {
        this.avatar = new Avatar().deserialize(input.avatar);
      }
    }
    return this;
  }
}
