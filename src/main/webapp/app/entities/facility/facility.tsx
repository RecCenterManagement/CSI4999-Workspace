import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './facility.reducer';
import { IFacility } from 'app/shared/model/facility.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFacilityProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Facility extends React.Component<IFacilityProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { facilityList, match } = this.props;
    return (
      <div>
        <h2 id="facility-heading">
          <Translate contentKey="recCenterManagementApp.facility.home.title">Facilities</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="recCenterManagementApp.facility.home.createLabel">Create a new Facility</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {facilityList && facilityList.length > 0 ? (
            <Table responsive aria-describedby="facility-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="recCenterManagementApp.facility.name">Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="recCenterManagementApp.facility.footage">Footage</Translate>
                  </th>
                  <th>
                    <Translate contentKey="recCenterManagementApp.facility.capacity">Capacity</Translate>
                  </th>
                  <th>
                    <Translate contentKey="recCenterManagementApp.facility.avSupport">Av Support</Translate>
                  </th>
                  <th>
                    <Translate contentKey="recCenterManagementApp.facility.foodAllowed">Food Allowed</Translate>
                  </th>
                  <th>
                    <Translate contentKey="recCenterManagementApp.facility.colorCode">Color Code</Translate>
                  </th>
                  <th>
                    <Translate contentKey="recCenterManagementApp.facility.description">Description</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {facilityList.map((facility, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${facility.id}`} color="link" size="sm">
                        {facility.id}
                      </Button>
                    </td>
                    <td>{facility.name}</td>
                    <td>{facility.footage}</td>
                    <td>{facility.capacity}</td>
                    <td>{facility.avSupport}</td>
                    <td>{facility.foodAllowed ? 'true' : 'false'}</td>
                    <td>{facility.colorCode}</td>
                    <td>{facility.description}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${facility.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${facility.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${facility.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="recCenterManagementApp.facility.home.notFound">No Facilities found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ facility }: IRootState) => ({
  facilityList: facility.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Facility);
