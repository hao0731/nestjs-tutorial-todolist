import { Role } from '../../../core/models/user';

export interface IUserPayload {
  id: string;
  username: string;
  role: Role;
}
