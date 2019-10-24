import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './equipment-bundle.reducer';
import { IEquipmentBundle } from 'app/shared/model/equipment-bundle.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEquipmentBundleProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class EquipmentBundle extends React.Component<IEquipmentBundleProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { equipmentBundleList, match } = this.props;
    return (
      <div>
        <h2 id="equipment-bundle-heading">
          <Translate contentKey="recCenterManagementApp.equipmentBundle.home.title">Equipment Bundles</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="recCenterManagementApp.equipmentBundle.home.createLabel">Create a new Equipment Bundle</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {equipmentBundleList && equipmentBundleList.length > 0 ? (
            <Table responsive aria-describedby="equipment-bundle-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="recCenterManagementApp.equipmentBundle.name">Name</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {equipmentBundleList.map((equipmentBundle, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${equipmentBundle.id}`} color="link" size="sm">
                        {equipmentBundle.id}
                      </Button>
                    </td>
                    <td>{equipmentBundle.name}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${equipmentBundle.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${equipmentBundle.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${equipmentBundle.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="recCenterManagementApp.equipmentBundle.home.notFound">No Equipment Bundles found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ equipmentBundle }: IRootState) => ({
  equipmentBundleList: equipmentBundle.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EquipmentBundle);
