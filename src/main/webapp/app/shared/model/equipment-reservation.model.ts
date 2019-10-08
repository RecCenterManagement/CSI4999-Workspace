import { IEquipment } from 'app/shared/model/equipment.model';

export interface IEquipmentReservation {
  id?: number;
  count?: number;
  equipment?: IEquipment;
}

export const defaultValue: Readonly<IEquipmentReservation> = {};
