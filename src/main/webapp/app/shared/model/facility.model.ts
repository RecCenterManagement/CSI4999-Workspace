import { IReservation } from 'app/shared/model/reservation.model';

export interface IFacility {
  id?: number;
  name?: string;
  reservations?: IReservation[];
}

export const defaultValue: Readonly<IFacility> = {};
