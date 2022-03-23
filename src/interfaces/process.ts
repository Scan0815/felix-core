import {Deserializable} from './deserialize';
import {IUser} from './user';
import {IFileStack} from './filestack';

export type TProcessEvent = 'tx' | 'cancel' | 'repayed';
export type TProcessType =
  'teaser' |
  'payment' |
  'payment_cancellation' |
  'mail' |
  'chat' |
  'chat_cancellation' |
  'chat_tip' |
  'chat_tip_cancellation' |
  'cam' |
  'cam_cancellation' |
  'message' |
  'message_cancellation' |
  'message_tip' |
  'message_tip_cancellation' |
  'message_file_stack' |
  'message_file_stack_cancellation' |
  'image' |
  'video' |
  'share' |
  'gift' |
  'file_stack' |
  'file_stack_cancellation' |
  'subscription';

export type TForeignKeyTypes =
  'file_stack' |
  'file_stack_cancellation' |
  'process' |
  'process_cancellation' |
  'user' |
  'subscription';

export type TTypeDetails =
  'share_owner' |
  'share_owner_cancellation' |
  'share_webmaster' |
  'share_webmaster_cancellation' |
  'share_sub_webmaster' |
  'message_file_stack' |
  'share_sub_webmaster_cancellation' |
  'share_rev_share_webmaster' |
  'share_rev_share_webmaster_cancellation' |
  'share_external_webmaster' |
  'share_external_webmaster_cancellation';

export type TBuyerTypeDetails = 'message_file_stack';


export interface IProcess {
  _id?: string,
  user_id?: string,
  type?: TProcessType,
  foreignkey?: string,
  type_detail?: TTypeDetails,
  foreign_key_type?: TForeignKeyTypes,
  event?: TProcessEvent,
  event_subid?: string,
  bookingdate?: string,
  moderator_id?: string,
  amount?: number|string,
  provision?:number|string,
  own_user_share?:boolean,
  wmid?: number,
  kamid?: number,
  wsid?: number,
  user?: IUser,
  buyer?: IUser,
  file_stack?: IFileStack,
  description: string,
  parent_process?: IProcess,
  subscription_id?: string,
  status?:string,
  invoice_id?: string,
  invoice_id_moderator?: string,
  updated_at?: string,
  created_at?: string,
  buyer_process_amount?: number,
  buyer_process_id?: string,
  buyer_process_type?: string,
  buyer_process_type_detail?: TBuyerTypeDetails,
  percentage_share?:number|string
}

export class Process implements IProcess, Deserializable {
  _id?: string;
  user_id?: string;
  type?: TProcessType;
  foreignkey?: string;
  type_detail?: TTypeDetails;
  foreign_key_type?: TForeignKeyTypes;
  moderator_id?: string;
  event?: TProcessEvent;
  event_subid?: string;
  bookingdate?: string;
  amount?: number|string;
  provision?:number|string;
  own_user_share?:boolean;
  wmid?: number;
  kamid?: number;
  wsid?: number;
  user?: IUser;
  buyer?: IUser;
  description: string;
  parent_process?: IProcess;
  file_stack?: IFileStack;
  subscription_id?: string;
  status?:string;
  invoice_id?: string;
  invoice_id_moderator?: string;
  updated_at?: string;
  created_at?: string;
  buyer_process_amount?: number;
  buyer_process_id?: string;
  buyer_process_type?: string;
  buyer_process_type_detail?: TBuyerTypeDetails;
  percentage_share?:number|string

  deserialize(input: IProcess) {
    if (input) {
      Object.assign(this, input);
    }
    return this;
  }
}
