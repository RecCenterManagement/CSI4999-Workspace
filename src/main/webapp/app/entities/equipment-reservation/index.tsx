import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EquipmentReservation from './equipment-reservation';
import EquipmentReservationDetail from './equipment-reservation-detail';
import EquipmentReservationUpdate from './equipment-reservation-update';
import EquipmentReservationDeleteDialog from './equipment-reservation-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EquipmentReservationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EquipmentReservationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EquipmentReservationDetail} />
      <ErrorBoundaryRoute path={match.url} component={EquipmentReservation} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={EquipmentReservationDeleteDialog} />
  </>
);

export default Routes;
