import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EquipmentBundleClaim from './equipment-bundle-claim';
import EquipmentBundleClaimDetail from './equipment-bundle-claim-detail';
import EquipmentBundleClaimUpdate from './equipment-bundle-claim-update';
import EquipmentBundleClaimDeleteDialog from './equipment-bundle-claim-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EquipmentBundleClaimUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EquipmentBundleClaimUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EquipmentBundleClaimDetail} />
      <ErrorBoundaryRoute path={match.url} component={EquipmentBundleClaim} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={EquipmentBundleClaimDeleteDialog} />
  </>
);

export default Routes;
