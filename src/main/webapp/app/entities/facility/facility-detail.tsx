import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './facility.reducer';
import { IFacility } from 'app/shared/model/facility.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFacilityDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class FacilityDetail extends React.Component<IFacilityDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { facilityEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="recCenterManagementApp.facility.detail.title">Facility</Translate> [<b>{facilityEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="recCenterManagementApp.facility.name">Name</Translate>
              </span>
            </dt>
            <dd>{facilityEntity.name}</dd>
            <dt>
              <span id="footage">
                <Translate contentKey="recCenterManagementApp.facility.footage">Footage</Translate>
              </span>
            </dt>
            <dd>{facilityEntity.footage}</dd>
            <dt>
              <span id="capacity">
                <Translate contentKey="recCenterManagementApp.facility.capacity">Capacity</Translate>
              </span>
            </dt>
            <dd>{facilityEntity.capacity}</dd>
            <dt>
              <span id="avSupport">
                <Translate contentKey="recCenterManagementApp.facility.avSupport">Av Support</Translate>
              </span>
            </dt>
            <dd>{facilityEntity.avSupport}</dd>
            <dt>
              <span id="foodAllowed">
                <Translate contentKey="recCenterManagementApp.facility.foodAllowed">Food Allowed</Translate>
              </span>
            </dt>
            <dd>{facilityEntity.foodAllowed ? 'true' : 'false'}</dd>
            <dt>
              <span id="colorCode">
                <Translate contentKey="recCenterManagementApp.facility.colorCode">Color Code</Translate>
              </span>
            </dt>
            <dd>{facilityEntity.colorCode}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="recCenterManagementApp.facility.description">Description</Translate>
              </span>
            </dt>
            <dd>{facilityEntity.description}</dd>
            <dt>
              <Translate contentKey="recCenterManagementApp.facility.equipmentBundles">Equipment Bundles</Translate>
            </dt>
            <dd>
              {facilityEntity.equipmentBundles
                ? facilityEntity.equipmentBundles.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.name}</a>
                      {i === facilityEntity.equipmentBundles.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/facility" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/facility/${facilityEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ facility }: IRootState) => ({
  facilityEntity: facility.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FacilityDetail);
