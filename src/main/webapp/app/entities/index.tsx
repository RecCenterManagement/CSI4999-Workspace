import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProfilePicture from './profile-picture';
import Facility from './facility';
import Reservation from './reservation';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/profile-picture`} component={ProfilePicture} />
      <ErrorBoundaryRoute path={`${match.url}/facility`} component={Facility} />
      <ErrorBoundaryRoute path={`${match.url}/reservation`} component={Reservation} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
