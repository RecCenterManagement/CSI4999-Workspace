import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <MenuItem icon="asterisk" to="/entity/profile-picture">
      <Translate contentKey="global.menu.entities.profilePicture" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/facility">
      <Translate contentKey="global.menu.entities.facility" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/reservation">
      <Translate contentKey="global.menu.entities.reservation" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/equipment">
      <Translate contentKey="global.menu.entities.equipment" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/equipment-reservation">
      <Translate contentKey="global.menu.entities.equipmentReservation" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/equipment-bundle">
      <Translate contentKey="global.menu.entities.equipmentBundle" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/equipment-bundle-claim">
      <Translate contentKey="global.menu.entities.equipmentBundleClaim" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/membership">
      <Translate contentKey="global.menu.entities.membership" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
