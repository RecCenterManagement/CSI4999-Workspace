import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './equipment-reservation.reducer';
import { IEquipmentReservation } from 'app/shared/model/equipment-reservation.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEquipmentReservationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EquipmentReservationDetail extends React.Component<IEquipmentReservationDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { equipmentReservationEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="recCenterManagementApp.equipmentReservation.detail.title">EquipmentReservation</Translate> [
            <b>{equipmentReservationEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="count">
                <Translate contentKey="recCenterManagementApp.equipmentReservation.count">Count</Translate>
              </span>
            </dt>
            <dd>{equipmentReservationEntity.count}</dd>
            <dt>
              <Translate contentKey="recCenterManagementApp.equipmentReservation.equipment">Equipment</Translate>
            </dt>
            <dd>{equipmentReservationEntity.equipment ? equipmentReservationEntity.equipment.id : ''}</dd>
            <dt>
              <Translate contentKey="recCenterManagementApp.equipmentReservation.reservation">Reservation</Translate>
            </dt>
            <dd>{equipmentReservationEntity.reservation ? equipmentReservationEntity.reservation.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/equipment-reservation" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/equipment-reservation/${equipmentReservationEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ equipmentReservation }: IRootState) => ({
  equipmentReservationEntity: equipmentReservation.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EquipmentReservationDetail);
