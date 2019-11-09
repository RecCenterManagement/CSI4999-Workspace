import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './equipment.reducer';
import { IEquipment } from 'app/shared/model/equipment.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEquipmentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Equipment extends React.Component<IEquipmentProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { equipmentList, match } = this.props;
    return (
      <div>
        <h2 id="equipment-heading">
          <Translate contentKey="recCenterManagementApp.equipment.home.title">Equipment</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="recCenterManagementApp.equipment.home.createLabel">Create a new Equipment</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {equipmentList && equipmentList.length > 0 ? (
            <Table responsive aria-describedby="equipment-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="recCenterManagementApp.equipment.name">Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="recCenterManagementApp.equipment.inventorySize">Inventory Size</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {equipmentList.map((equipment, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${equipment.id}`} color="link" size="sm">
                        {equipment.id}
                      </Button>
                    </td>
                    <td>{equipment.name}</td>
                    <td>{equipment.inventorySize}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${equipment.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${equipment.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${equipment.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="recCenterManagementApp.equipment.home.notFound">No Equipment found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ equipment }: IRootState) => ({
  equipmentList: equipment.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Equipment);
