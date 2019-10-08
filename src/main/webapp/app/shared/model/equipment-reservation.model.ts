import { IEquipment } from 'app/shared/model/equipment.model';
import { IReservation } from 'app/shared/model/reservation.model';

export interface IEquipmentReservation {
  id?: number;
  count?: number;
  equipment?: IEquipment;
  reservation?: IReservation;
}

export const defaultValue: Readonly<IEquipmentReservation> = {};
