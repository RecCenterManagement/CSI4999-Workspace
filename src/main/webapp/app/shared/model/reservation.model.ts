import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';
import { IFacility } from 'app/shared/model/facility.model';
import { IEquipmentReservation } from 'app/shared/model/equipment-reservation.model';

export interface IReservation {
  id?: number;
  event?: string;
  estimatedParticipants?: number;
  startTime?: Moment;
  endTime?: Moment;
  user?: IUser;
  facilities?: IFacility[];
  equipmentReservations?: IEquipmentReservation[];
}

export const defaultValue: Readonly<IReservation> = {};
