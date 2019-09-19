import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Col, Alert, Button } from 'reactstrap';
import { Translate, getUrlParameter } from 'react-jhipster';

import { IRootState } from 'app/shared/reducers';
import { activateAction, reset } from './activate.reducer';

const successAlert = (
  <Alert color="success">
      Your user account has been activated successfully.{' '}
      <Link to="/login" className="alert-link">
       Please sign in
    </Link>
    .
  </Alert>
);

const failureAlert = (
  <Alert color="danger">
      <strong>Your account could not be activated!</strong> Please use the registration form again to {' '}
      <Link to="/register" className="alert-link">
      sign up {' '}</Linkink>
      or go to the {' '}
      <Link to="">home {' '}</Link>
      page.
  </Alert>
);

export interface IActivateProps extends StateProps, DispatchProps, RouteComponentProps<{ key: any }> {}

export const ActivatePage = (props: IActivateProps) => {
  useEffect(() => {
    const key = getUrlParameter('key', props.location.search);
    props.activateAction(key);
    return () => {
      props.reset();
    };
  }, []);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h1>
            <center>Account Activation</center>
          </h1>
          {props.activationSuccess ? successAlert : undefined}  /*change props.activationSuccess and props.activationFailure to true and false*/
          {props.activationFailure ? failureAlert : undefined}
        </Col>
      </Row>
      <br /><br /><br />
    </div>
  );
};

const mapStateToProps = ({ activate }: IRootState) => ({
  activationSuccess: activate.activationSuccess,
  activationFailure: activate.activationFailure
});

const mapDispatchToProps = { activateAction, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivatePage);
