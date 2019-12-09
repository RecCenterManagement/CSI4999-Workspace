import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EquipmentBundle from './equipment-bundle';
import EquipmentBundleDetail from './equipment-bundle-detail';
import EquipmentBundleUpdate from './equipment-bundle-update';
import EquipmentBundleDeleteDialog from './equipment-bundle-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EquipmentBundleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EquipmentBundleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EquipmentBundleDetail} />
      <ErrorBoundaryRoute path={match.url} component={EquipmentBundle} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={EquipmentBundleDeleteDialog} />
  </>
);

export default Routes;
