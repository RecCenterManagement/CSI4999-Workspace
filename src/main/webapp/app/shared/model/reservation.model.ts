import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';
import { IFacility } from 'app/shared/model/facility.model';
import { IEquipmentReservation } from 'app/shared/model/equipment-reservation.model';
import { ReservationStatus } from 'app/shared/model/enumerations/reservation-status.model';

export interface IReservation {
  id?: number;
  event?: string;
  estimatedParticipants?: number;
  startTime?: Moment;
  endTime?: Moment;
  status?: ReservationStatus;
  user?: IUser;
  facilities?: IFacility[];
  equipmentReservations?: IEquipmentReservation[];
}

export const defaultValue: Readonly<IReservation> = {};
