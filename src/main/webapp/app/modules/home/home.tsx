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
    <Row className="backgroundHome" style={{ height: '80vh' }}>
      <div className="buttonDiv">
        <Button className="homeButton" block>
          Membership
        </Button>
        <Button className="homeButton" block>
          Checkout Equipment
        </Button>
        <Button className="homeButton" block>
          Checkout Rooms
        </Button>
      </div>
      <span className="title"> UNIVERSITY RECREATION AND WELL-BEING </span>
    </Row>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
