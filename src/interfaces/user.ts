import {IRole, Role} from './role';
import {Deserializable} from './deserialize';
import {Avatar, IAvatar} from './avatar';
import {IBankDetails, IContactData, IPayPal, IPersonalData} from "./personal-data";
import {StringToColour} from "../helpers/css-utils";

export type UserStatus = 'free' | 'confirmation' | 'bounce' | 'deleted';
export type UserLoginAllowedKeys= 'identifier' | 'password';
export type UserRegisterAllowedKeys= 'identifier' | 'password' | 'name';
export type UserResetAllowedKeys= 'password' | 'retype';
export type UserVerificationStatus = 'pending'|'declined'|'approved'|'needs-review'|'error';

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
  _id: string|undefined;
  name: string|undefined;
  bio: string|undefined;
  identifier?: string;
  status: UserStatus|undefined;
  social_id?: string|undefined;
  color?: string|undefined;
  coins?: number|undefined;
  url:string|undefined;
  background?: string|undefined;
  roles: IRole[]|undefined;
  avatar: IAvatar|undefined;
  verified: boolean|undefined;
  verification_status: UserVerificationStatus|undefined;
  fileStackWithPriceCount: number|undefined;
  file_stack_count?: number|undefined;
  follower_count?: number|undefined;
  following_count?: number|undefined;
  activity_count?: number|undefined;
  follow_user_ids?: string[]|undefined;
  notification_settings?: string[];
  bank_details?: IBankDetails|undefined;
  paypal?: IPayPal|undefined;
  personal_data?: IPersonalData|undefined;
  contact_data?: IContactData|undefined;
  updated_at?: string|undefined;
  created_at?: string|undefined;
}

export class User implements IUser, Deserializable {
  _id: string|undefined;
  name: string|undefined;
  bio: string|undefined;
  identifier?: string|undefined;
  status: UserStatus|undefined;
  social_id?: string|undefined;
  color?: string|undefined;
  coins?: number|undefined;
  url:string|undefined;
  background?: string|undefined;
  roles: IRole[]|undefined;
  avatar: IAvatar|undefined;
  verified: boolean|undefined;
  verification_status: UserVerificationStatus|undefined;
  fileStackWithPriceCount: number|undefined;
  file_stack_count?: number;
  notification_settings?: string[];
  follower_count?: number;
  following_count?: number;
  activity_count?: number;
  follow_user_ids?: string[];
  bank_details?: IBankDetails;
  paypal?: IPayPal;
  personal_data?: IPersonalData;
  contact_data?: IContactData;
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
      if (!this.background && !this.color && this.name) {
        Object.assign(this, StringToColour(this.name));
      }
    }
    return this;
  }
}
