import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Translate, getUrlParameter } from 'react-jhipster';
import { IRootState } from 'app/shared/reducers';
import { activateAction, reset } from './activate.reducer';
import { Card, Button, CardHeader, CardTitle, CardText, Row, Col, Media } from 'reactstrap';

const successAlert = (
  <Card className="text-center" body>
    <CardHeader style={{ backgroundColor: '#33691e', color: '#FFFFFF', margin: '-20px', fontWeight: 500 }}>
      Account activated successfully!
    </CardHeader>
    <Row className="justify-content-center">
      <Col md="12">
        <Media width="100%" src={'content/images/grizzbear2.svg'} alt="Grizz bear with email" />
      </Col>
      <Col md="6">
        <CardText>
          <strong>Your email has been verified and your user account has been activated.</strong>
        </CardText>
        <Button outline color="primary">
          <Link to="/login" className="alert-link">
            Sign In
          </Link>
        </Button>
      </Col>
    </Row>
  </Card>
);

const failureAlert = (
  <Card className="text-center" body>
    <CardHeader style={{ backgroundColor: '#b71c1c', color: '#FFFFFF', margin: '-20px', fontWeight: 500 }}>
      Account could not be activated
    </CardHeader>
    <Row className="justify-content-center">
      <Col md="12">
        <Media width="100%" src={'content/images/grizzbear2.svg'} alt="Grizz bear with email" />
      </Col>
      <Col md="6">
        <CardText>
          <strong>Your activation link expired and your account could not be activated.</strong> Please use the registration form to
          re-register.
        </CardText>
        <Button outline color="primary">
          <Link to="/register" className="alert-link">
            Register
          </Link>
        </Button>
      </Col>
    </Row>
  </Card>
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
          {props.activationSuccess ? successAlert : undefined}
          {props.activationFailure ? failureAlert : undefined}
        </Col>
      </Row>
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
