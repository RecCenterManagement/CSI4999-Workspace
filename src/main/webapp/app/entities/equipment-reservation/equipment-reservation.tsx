import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './equipment-reservation.reducer';
import { IEquipmentReservation } from 'app/shared/model/equipment-reservation.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEquipmentReservationProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class EquipmentReservation extends React.Component<IEquipmentReservationProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { equipmentReservationList, match } = this.props;
    return (
      <div>
        <h2 id="equipment-reservation-heading">
          <Translate contentKey="recCenterManagementApp.equipmentReservation.home.title">Equipment Reservations</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="recCenterManagementApp.equipmentReservation.home.createLabel">
              Create a new Equipment Reservation
            </Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {equipmentReservationList && equipmentReservationList.length > 0 ? (
            <Table responsive aria-describedby="equipment-reservation-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="recCenterManagementApp.equipmentReservation.count">Count</Translate>
                  </th>
                  <th>
                    <Translate contentKey="recCenterManagementApp.equipmentReservation.equipment">Equipment</Translate>
                  </th>
                  <th>
                    <Translate contentKey="recCenterManagementApp.equipmentReservation.reservation">Reservation</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {equipmentReservationList.map((equipmentReservation, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${equipmentReservation.id}`} color="link" size="sm">
                        {equipmentReservation.id}
                      </Button>
                    </td>
                    <td>{equipmentReservation.count}</td>
                    <td>
                      {equipmentReservation.equipment ? (
                        <Link to={`equipment/${equipmentReservation.equipment.id}`}>{equipmentReservation.equipment.id}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {equipmentReservation.reservation ? (
                        <Link to={`reservation/${equipmentReservation.reservation.id}`}>{equipmentReservation.reservation.id}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${equipmentReservation.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${equipmentReservation.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${equipmentReservation.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="recCenterManagementApp.equipmentReservation.home.notFound">No Equipment Reservations found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ equipmentReservation }: IRootState) => ({
  equipmentReservationList: equipmentReservation.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EquipmentReservation);
