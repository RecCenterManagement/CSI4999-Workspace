import { IEquipmentBundle } from 'app/shared/model/equipment-bundle.model';
import { IEquipment } from 'app/shared/model/equipment.model';

export interface IEquipmentBundleClaim {
  id?: number;
  count?: number;
  equipmentBundle?: IEquipmentBundle;
  equipment?: IEquipment;
}

export const defaultValue: Readonly<IEquipmentBundleClaim> = {};
