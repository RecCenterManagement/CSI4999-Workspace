import { IEquipmentBundleClaim } from 'app/shared/model/equipment-bundle-claim.model';

export interface IEquipmentBundle {
  id?: number;
  name?: string;
  claims?: IEquipmentBundleClaim[];
}

export const defaultValue: Readonly<IEquipmentBundle> = {};
