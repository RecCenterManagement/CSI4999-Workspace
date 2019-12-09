import React from 'react';
import { Translate, translate } from 'react-jhipster';
import { Button, Label, Alert, Row, Col } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Link } from 'react-router-dom';

export interface ILoginModalProps {
  loginError: boolean;
  handleLogin: Function;
}

class LoginModal extends React.Component<ILoginModalProps> {
  handleSubmit = (event, errors, { username, password, rememberMe }) => {
    const { handleLogin } = this.props;
    handleLogin(username, password, rememberMe);
  };

  render() {
    const { loginError } = this.props;

    // Modal takes a component as an optional param
    const closeButton = (
      <Button tag={Link} to="/" onClick={() => handleClose}>
        &times;
      </Button>
    );
    return (
      <div id="login-page">
        <AvForm onSubmit={this.handleSubmit}>
          <div className="justify-content-center" style={{ fontSize: '32px', fontWeight: 600, color: '#8e774d', alignSelf: 'center' }}>
            <Translate contentKey="login.title">Sign in</Translate>
          </div>
          <Row>
            <Col md="12">
              {loginError ? (
                <Alert color="danger">
                  <Translate contentKey="login.messages.error.authentication">
                    <strong>Failed to sign in!</strong> Please check your credentials and try again.
                  </Translate>
                </Alert>
              ) : null}
            </Col>
            <Col md="12">
              <AvField
                name="username"
                label={translate('global.form.username.label')}
                placeholder={translate('global.form.username.placeholder')}
                required
                errorMessage="Username cannot be empty!"
                autoFocus
              />
              <AvField
                name="password"
                type="password"
                label={translate('login.form.password')}
                placeholder={translate('login.form.password.placeholder')}
                required
                errorMessage="Password cannot be empty!"
              />
              <AvGroup check inline>
                <Label className="form-check-label">
                  <AvInput type="checkbox" name="rememberMe" /> <Translate contentKey="login.form.rememberme">Remember me</Translate>
                </Label>
              </AvGroup>
            </Col>
          </Row>
          <div className="mt-1">&nbsp;</div>
          <Alert color="warning">
            <Link to="/reset/request">
              <Translate contentKey="login.password.forgot">Did you forget your password?</Translate>
            </Link>
          </Alert>
          <Button color="primary" type="submit">
            <Translate contentKey="login.form.button">Sign in</Translate>
          </Button>
        </AvForm>
      </div>
    );
  }
}

export default LoginModal;
