import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps, Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';
import { login } from 'app/shared/reducers/authentication';
import LoginModal from './login-modal';
import { Translate, translate } from 'react-jhipster';

export interface ILoginProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}

export const Login = (props: ILoginProps) => {
  const handleLogin = (username, password, rememberMe = false) => props.login(username, password, rememberMe);

  const { location, isAuthenticated } = props;
  const { from } = location.state || { from: { pathname: '/', search: location.search } };
  if (isAuthenticated) {
    return <Redirect to={from} />;
  }
  return (
    <Row className="justify-content-center">
      <Col background-color="#dfd3b5" md="8">
        <LoginModal handleLogin={handleLogin} loginError={props.loginError} />
      </Col>
      <Col
        md="4"
        className="justify-content-center"
        style={{ backgroundColor: '#877148', marginRight: '-10px', marginTop: '-20px', marginBottom: '-20px' }}
      >
        <div style={{ padding: 20 }}>
          <div style={{ fontSize: '24px', fontWeight: 600, color: 'white' }}>
            <Translate contentKey="global.messages.info.register.noaccount">Don't have an account yet?</Translate>
            <div style={{ fontSize: '18px', fontWeight: 500 }}>
              Start your fitness journey at Oakland's University Recreation and Well-Being
            </div>
          </div>
          <Link to="/register">
            <Translate contentKey="global.messages.info.register.link">Register</Translate>
          </Link>
        </div>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ authentication }: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated,
  loginError: authentication.loginError
});

const mapDispatchToProps = { login };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
