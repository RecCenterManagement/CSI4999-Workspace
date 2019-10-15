import { IReservation } from 'app/shared/model/reservation.model';

export interface IFacility {
  id?: number;
  name?: string;
  footage?: number;
  capacity?: number;
  avSupport?: string;
  foodAllowed?: boolean;
  colorCode?: string;
  description?: string;
  reservations?: IReservation[];
}

export const defaultValue: Readonly<IFacility> = {
  foodAllowed: false
};
