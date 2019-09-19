import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert, Button, Container, Form, Media } from 'reactstrap';
import { SketchPicker } from 'react-color';

import { IRootState } from 'app/shared/reducers';

export type IHomeProp = StateProps;

export const Home = (props: IHomeProp) => {
  const { account } = props;

  return (
    <Container>
      <Col md="5">
        <div style={{ height: '600px' }}>
          <div style={{ position: 'absolute', height: '100%', width: '50%', top: '10%' }}>
            <Button style={{ background: '#b59a57', height: '25%' }} block>
              Membership
            </Button>{' '}
            <Button style={{ background: '#b59a57', height: '25%' }} block>
              Checkout Equipment
            </Button>{' '}
            <Button style={{ background: '#b59a57', height: '25%' }} block>
              Checkout Rooms
            </Button>{' '}
          </div>
        </div>
      </Col>
    </Container>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
