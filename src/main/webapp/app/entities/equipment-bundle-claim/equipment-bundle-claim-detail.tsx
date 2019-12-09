import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './equipment-bundle-claim.reducer';
import { IEquipmentBundleClaim } from 'app/shared/model/equipment-bundle-claim.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEquipmentBundleClaimDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EquipmentBundleClaimDetail extends React.Component<IEquipmentBundleClaimDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { equipmentBundleClaimEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="recCenterManagementApp.equipmentBundleClaim.detail.title">EquipmentBundleClaim</Translate> [
            <b>{equipmentBundleClaimEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="count">
                <Translate contentKey="recCenterManagementApp.equipmentBundleClaim.count">Count</Translate>
              </span>
            </dt>
            <dd>{equipmentBundleClaimEntity.count}</dd>
            <dt>
              <Translate contentKey="recCenterManagementApp.equipmentBundleClaim.equipmentBundle">Equipment Bundle</Translate>
            </dt>
            <dd>{equipmentBundleClaimEntity.equipmentBundle ? equipmentBundleClaimEntity.equipmentBundle.name : ''}</dd>
            <dt>
              <Translate contentKey="recCenterManagementApp.equipmentBundleClaim.equipment">Equipment</Translate>
            </dt>
            <dd>{equipmentBundleClaimEntity.equipment ? equipmentBundleClaimEntity.equipment.name : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/equipment-bundle-claim" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/equipment-bundle-claim/${equipmentBundleClaimEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ equipmentBundleClaim }: IRootState) => ({
  equipmentBundleClaimEntity: equipmentBundleClaim.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EquipmentBundleClaimDetail);
