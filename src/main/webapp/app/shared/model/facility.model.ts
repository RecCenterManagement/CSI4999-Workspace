import { IReservation } from 'app/shared/model/reservation.model';
import { IEquipmentBundle } from 'app/shared/model/equipment-bundle.model';

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
  equipmentBundles?: IEquipmentBundle[];
}

export const defaultValue: Readonly<IFacility> = {
  foodAllowed: false
};
