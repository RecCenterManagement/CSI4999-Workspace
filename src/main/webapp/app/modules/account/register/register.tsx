import React, { useState, useEffect } from 'react';
import { Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Row, Col, Button, Media } from 'reactstrap';
import { Link } from 'react-router-dom';

import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { IRootState } from 'app/shared/reducers';
import { handleRegister, reset } from './register.reducer';

export interface IRegisterProps extends StateProps, DispatchProps {}

export const RegisterPage = (props: IRegisterProps) => {
  const [password, setPassword] = useState('');

  useEffect(() => () => props.reset(), []);

  const handleValidSubmit = (event, values) => {
    props.handleRegister(values.username, values.email, values.firstPassword, props.currentLocale);
    event.preventDefault();
  };

  const updatePassword = event => setPassword(event.target.value);
  return (
    <Row>
      <Col
        md="5"
        className="justify-content-center"
        style={{ backgroundColor: '#877148', marginLeft: '-10px', marginTop: '-20px', marginBottom: '-20px' }}
      >
        <div style={{ padding: 20 }}>
          <div style={{ fontSize: '24px', fontWeight: 600, color: 'white' }}>Long break? Get back on track!</div>
          <Media width="100%" src={'content/images/grizzbear.svg'} alt="Grizz bear" />
          <Button color="info">
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      </Col>
      <Col md="7">
        <Row className="justify-content-center">
          <Col md="8">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="justify-content-center" style={{ fontSize: '32px', fontWeight: 600, color: '#877148', alignSelf: 'center' }}>
                <Translate contentKey="register.title">Register</Translate>
              </div>
            </div>
          </Col>
          <Col md="8">
            <AvForm id="register-form" onValidSubmit={handleValidSubmit}>
              <AvField
                name="username"
                label={translate('global.form.username.label')}
                placeholder={translate('global.form.username.placeholder')}
                validate={{
                  required: { value: true, errorMessage: translate('register.messages.validate.login.required') },
                  pattern: { value: '^[_.@A-Za-z0-9-]*$', errorMessage: translate('register.messages.validate.login.pattern') },
                  minLength: { value: 1, errorMessage: translate('register.messages.validate.login.minlength') },
                  maxLength: { value: 50, errorMessage: translate('register.messages.validate.login.maxlength') }
                }}
              />
              <AvField
                name="email"
                label={translate('global.form.email.label')}
                placeholder={translate('global.form.email.placeholder')}
                type="email"
                validate={{
                  required: { value: true, errorMessage: translate('global.messages.validate.email.required') },
                  minLength: { value: 5, errorMessage: translate('global.messages.validate.email.minlength') },
                  maxLength: { value: 254, errorMessage: translate('global.messages.validate.email.maxlength') }
                }}
              />
              <AvField
                name="firstPassword"
                label={translate('global.form.newpassword.label')}
                placeholder={translate('global.form.newpassword.placeholder')}
                type="password"
                onChange={updatePassword}
                validate={{
                  required: { value: true, errorMessage: translate('global.messages.validate.newpassword.required') },
                  minLength: { value: 4, errorMessage: translate('global.messages.validate.newpassword.minlength') },
                  maxLength: { value: 50, errorMessage: translate('global.messages.validate.newpassword.maxlength') }
                }}
              />
              <PasswordStrengthBar password={password} />
              <AvField
                name="secondPassword"
                label={translate('global.form.confirmpassword.label')}
                placeholder={translate('global.form.confirmpassword.placeholder')}
                type="password"
                validate={{
                  required: { value: true, errorMessage: translate('global.messages.validate.confirmpassword.required') },
                  minLength: { value: 4, errorMessage: translate('global.messages.validate.confirmpassword.minlength') },
                  maxLength: { value: 50, errorMessage: translate('global.messages.validate.confirmpassword.maxlength') },
                  match: { value: 'firstPassword', errorMessage: translate('global.messages.error.dontmatch') }
                }}
              />
              <Button id="register-submit" color="primary" type="submit" borderRadius="4px">
                <Translate contentKey="register.form.button">Register</Translate>
              </Button>
            </AvForm>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ locale }: IRootState) => ({
  currentLocale: locale.currentLocale
});

const mapDispatchToProps = { handleRegister, reset };
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage);
