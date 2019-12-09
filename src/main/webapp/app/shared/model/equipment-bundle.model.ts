import { IEquipmentBundleClaim } from 'app/shared/model/equipment-bundle-claim.model';
import { IFacility } from 'app/shared/model/facility.model';

export interface IEquipmentBundle {
  id?: number;
  name?: string;
  claims?: IEquipmentBundleClaim[];
  facilities?: IFacility[];
}

export const defaultValue: Readonly<IEquipmentBundle> = {};
