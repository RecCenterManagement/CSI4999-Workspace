import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import profilePicture, {
  ProfilePictureState
} from 'app/entities/profile-picture/profile-picture.reducer';
// prettier-ignore
import facility, {
  FacilityState
} from 'app/entities/facility/facility.reducer';
// prettier-ignore
import reservation, {
  ReservationState
} from 'app/entities/reservation/reservation.reducer';
// prettier-ignore
import equipment, {
  EquipmentState
} from 'app/entities/equipment/equipment.reducer';
// prettier-ignore
import equipmentReservation, {
  EquipmentReservationState
} from 'app/entities/equipment-reservation/equipment-reservation.reducer';
// prettier-ignore
// prettier-ignore
import equipmentBundle, {
  EquipmentBundleState
} from 'app/entities/equipment-bundle/equipment-bundle.reducer';
// prettier-ignore
import equipmentBundleClaim, {
  EquipmentBundleClaimState
} from 'app/entities/equipment-bundle-claim/equipment-bundle-claim.reducer';
// prettier-ignore
import membership, {
  MembershipState
} from 'app/entities/membership/membership.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly profilePicture: ProfilePictureState;
  readonly facility: FacilityState;
  readonly reservation: ReservationState;
  readonly equipment: EquipmentState;
  readonly equipmentReservation: EquipmentReservationState;
  readonly equipmentBundle: EquipmentBundleState;
  readonly equipmentBundleClaim: EquipmentBundleClaimState;
  readonly membership: MembershipState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  profilePicture,
  facility,
  reservation,
  equipment,
  equipmentReservation,
  equipmentBundle,
  equipmentBundleClaim,
  membership,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
