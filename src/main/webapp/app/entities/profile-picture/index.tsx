import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProfilePicture from './profile-picture';
import ProfilePictureDetail from './profile-picture-detail';
import ProfilePictureUpdate from './profile-picture-update';
import ProfilePictureDeleteDialog from './profile-picture-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProfilePictureUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProfilePictureUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProfilePictureDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProfilePicture} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ProfilePictureDeleteDialog} />
  </>
);

export default Routes;
