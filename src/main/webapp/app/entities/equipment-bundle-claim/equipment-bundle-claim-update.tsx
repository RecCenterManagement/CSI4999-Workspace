import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEquipmentBundle } from 'app/shared/model/equipment-bundle.model';
import { getEntities as getEquipmentBundles } from 'app/entities/equipment-bundle/equipment-bundle.reducer';
import { IEquipment } from 'app/shared/model/equipment.model';
import { getEntities as getEquipment } from 'app/entities/equipment/equipment.reducer';
import { getEntity, updateEntity, createEntity, reset } from './equipment-bundle-claim.reducer';
import { IEquipmentBundleClaim } from 'app/shared/model/equipment-bundle-claim.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEquipmentBundleClaimUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IEquipmentBundleClaimUpdateState {
  isNew: boolean;
  equipmentBundleId: string;
  equipmentId: string;
}

export class EquipmentBundleClaimUpdate extends React.Component<IEquipmentBundleClaimUpdateProps, IEquipmentBundleClaimUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      equipmentBundleId: '0',
      equipmentId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getEquipmentBundles();
    this.props.getEquipment();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { equipmentBundleClaimEntity } = this.props;
      const entity = {
        ...equipmentBundleClaimEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/equipment-bundle-claim');
  };

  render() {
    const { equipmentBundleClaimEntity, equipmentBundles, equipment, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="recCenterManagementApp.equipmentBundleClaim.home.createOrEditLabel">
              <Translate contentKey="recCenterManagementApp.equipmentBundleClaim.home.createOrEditLabel">
                Create or edit a EquipmentBundleClaim
              </Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : equipmentBundleClaimEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="equipment-bundle-claim-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="equipment-bundle-claim-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="countLabel" for="equipment-bundle-claim-count">
                    <Translate contentKey="recCenterManagementApp.equipmentBundleClaim.count">Count</Translate>
                  </Label>
                  <AvField
                    id="equipment-bundle-claim-count"
                    type="string"
                    className="form-control"
                    name="count"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="equipment-bundle-claim-equipmentBundle">
                    <Translate contentKey="recCenterManagementApp.equipmentBundleClaim.equipmentBundle">Equipment Bundle</Translate>
                  </Label>
                  <AvInput
                    id="equipment-bundle-claim-equipmentBundle"
                    type="select"
                    className="form-control"
                    name="equipmentBundle.id"
                    value={isNew ? equipmentBundles[0] && equipmentBundles[0].id : equipmentBundleClaimEntity.equipmentBundle.id}
                    required
                  >
                    {equipmentBundles
                      ? equipmentBundles.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvFeedback>
                    <Translate contentKey="entity.validation.required">This field is required.</Translate>
                  </AvFeedback>
                </AvGroup>
                <AvGroup>
                  <Label for="equipment-bundle-claim-equipment">
                    <Translate contentKey="recCenterManagementApp.equipmentBundleClaim.equipment">Equipment</Translate>
                  </Label>
                  <AvInput
                    id="equipment-bundle-claim-equipment"
                    type="select"
                    className="form-control"
                    name="equipment.id"
                    value={isNew ? equipment[0] && equipment[0].id : equipmentBundleClaimEntity.equipment.id}
                    required
                  >
                    {equipment
                      ? equipment.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvFeedback>
                    <Translate contentKey="entity.validation.required">This field is required.</Translate>
                  </AvFeedback>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/equipment-bundle-claim" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  equipmentBundles: storeState.equipmentBundle.entities,
  equipment: storeState.equipment.entities,
  equipmentBundleClaimEntity: storeState.equipmentBundleClaim.entity,
  loading: storeState.equipmentBundleClaim.loading,
  updating: storeState.equipmentBundleClaim.updating,
  updateSuccess: storeState.equipmentBundleClaim.updateSuccess
});

const mapDispatchToProps = {
  getEquipmentBundles,
  getEquipment,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EquipmentBundleClaimUpdate);
