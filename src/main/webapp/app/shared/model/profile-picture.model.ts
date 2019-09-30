import { IUser } from 'app/shared/model/user.model';

export interface IProfilePicture {
  id?: number;
  imageDataContentType?: string;
  imageData?: any;
  user?: IUser;
}

export const defaultValue: Readonly<IProfilePicture> = {};
