import React from 'react';
import { Translate } from 'react-jhipster';

import { Button, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';

export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img src="https://moodle.oakland.edu/theme/image.php/ou_boost/theme/1567007824/OU_Dark" alt="Logo" />
  </div>
);

export const Brand = props => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <BrandIcon />
    <span className="brand-title">
      <Translate contentKey="global.title">Rec Center</Translate>
    </span>
  </NavbarBrand>
);

export const SignInButton = props =>
  props.isAuthenticated ? (
    <Button tag={Link} to="/logout" style={{ marginLeft: '20px' }} outline color="primary">
      Log Out
    </Button>
  ) : (
    <>
      <Button tag={Link} to="/login" style={{ marginLeft: '20px', marginRight: '20px' }} outline color="primary">
        Log In
      </Button>
      <Button tag={Link} to="/register" outline color="secondary">
        Register
      </Button>
    </>
  );
export const Calendar = props => (
  <NavItem>
    <NavLink tag={Link} to="/calendar" className="d-flex align-items-center">
      <FontAwesomeIcon icon="home" />
      <span>
        <Translate contentKey="global.menu.calendar">Calendar</Translate>
      </span>
    </NavLink>
  </NavItem>
);

export const Home = props => (
  <NavItem>
    <NavLink tag={Link} to="/" className="d-flex align-items-center">
      <FontAwesomeIcon icon="home" />
      <span>
        <Translate contentKey="global.menu.home">Home</Translate>
      </span>
    </NavLink>
  </NavItem>
);
