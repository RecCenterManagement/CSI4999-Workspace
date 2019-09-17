import { IUser } from 'app/shared/model/user.model';

export interface IExtendedUser {
  id?: number;
  badActor?: boolean;
  user?: IUser;
}

export const defaultValue: Readonly<IExtendedUser> = {
  badActor: false
};
