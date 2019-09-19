export interface IExtendedUser {
  id?: number;
  badActor?: boolean;
  userLogin?: string;
  userId?: number;
}

export const defaultValue: Readonly<IExtendedUser> = {
  badActor: false
};
