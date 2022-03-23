import {ICredentials} from './credentials';
import {IUser} from './user';

export interface AuthResponse {
  credentials: ICredentials;
  user: IUser;
}
