import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';
import { MembershipType } from 'app/shared/model/enumerations/membership-type.model';

export interface IMembership {
  id?: number;
  membershipType?: MembershipType;
  expirationDate?: Moment;
  user?: IUser;
}

export const defaultValue: Readonly<IMembership> = {};
