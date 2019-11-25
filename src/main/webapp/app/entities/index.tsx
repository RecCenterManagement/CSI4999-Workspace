import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProfilePicture from './profile-picture';
import Facility from './facility';
import Reservation from './reservation';
import Equipment from './equipment';
import EquipmentReservation from './equipment-reservation';
import EquipmentBundle from './equipment-bundle';
import EquipmentBundleClaim from './equipment-bundle-claim';
import Membership from './membership';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/profile-picture`} component={ProfilePicture} />
      <ErrorBoundaryRoute path={`${match.url}/facility`} component={Facility} />
      <ErrorBoundaryRoute path={`${match.url}/reservation`} component={Reservation} />
      <ErrorBoundaryRoute path={`${match.url}/equipment`} component={Equipment} />
      <ErrorBoundaryRoute path={`${match.url}/equipment-reservation`} component={EquipmentReservation} />
      <ErrorBoundaryRoute path={`${match.url}/equipment-bundle`} component={EquipmentBundle} />
      <ErrorBoundaryRoute path={`${match.url}/equipment-bundle-claim`} component={EquipmentBundleClaim} />
      <ErrorBoundaryRoute path={`${match.url}/membership`} component={Membership} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
