import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IReservation } from 'app/shared/model/reservation.model';
import { getEntities as getReservations } from 'app/entities/reservation/reservation.reducer';
import { IEquipmentBundle } from 'app/shared/model/equipment-bundle.model';
import { getEntities as getEquipmentBundles } from 'app/entities/equipment-bundle/equipment-bundle.reducer';
import { getEntity, updateEntity, createEntity, reset } from './facility.reducer';
import { IFacility } from 'app/shared/model/facility.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFacilityUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IFacilityUpdateState {
  isNew: boolean;
  idsequipmentBundles: any[];
  reservationsId: string;
}

export class FacilityUpdate extends React.Component<IFacilityUpdateProps, IFacilityUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsequipmentBundles: [],
      reservationsId: '0',
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

    this.props.getReservations();
    this.props.getEquipmentBundles();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { facilityEntity } = this.props;
      const entity = {
        ...facilityEntity,
        ...values,
        equipmentBundles: mapIdList(values.equipmentBundles)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/facility');
  };

  render() {
    const { facilityEntity, reservations, equipmentBundles, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="recCenterManagementApp.facility.home.createOrEditLabel">
              <Translate contentKey="recCenterManagementApp.facility.home.createOrEditLabel">Create or edit a Facility</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : facilityEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="facility-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="facility-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="facility-name">
                    <Translate contentKey="recCenterManagementApp.facility.name">Name</Translate>
                  </Label>
                  <AvField
                    id="facility-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="footageLabel" for="facility-footage">
                    <Translate contentKey="recCenterManagementApp.facility.footage">Footage</Translate>
                  </Label>
                  <AvField
                    id="facility-footage"
                    type="string"
                    className="form-control"
                    name="footage"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="capacityLabel" for="facility-capacity">
                    <Translate contentKey="recCenterManagementApp.facility.capacity">Capacity</Translate>
                  </Label>
                  <AvField
                    id="facility-capacity"
                    type="string"
                    className="form-control"
                    name="capacity"
                    validate={{
                      min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="avSupportLabel" for="facility-avSupport">
                    <Translate contentKey="recCenterManagementApp.facility.avSupport">Av Support</Translate>
                  </Label>
                  <AvField
                    id="facility-avSupport"
                    type="text"
                    name="avSupport"
                    validate={{
                      maxLength: { value: 180, errorMessage: translate('entity.validation.maxlength', { max: 180 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="foodAllowedLabel" check>
                    <AvInput id="facility-foodAllowed" type="checkbox" className="form-control" name="foodAllowed" />
                    <Translate contentKey="recCenterManagementApp.facility.foodAllowed">Food Allowed</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="colorCodeLabel" for="facility-colorCode">
                    <Translate contentKey="recCenterManagementApp.facility.colorCode">Color Code</Translate>
                  </Label>
                  <AvField id="facility-colorCode" type="text" name="colorCode" />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="facility-description">
                    <Translate contentKey="recCenterManagementApp.facility.description">Description</Translate>
                  </Label>
                  <AvField
                    id="facility-description"
                    type="text"
                    name="description"
                    validate={{
                      maxLength: { value: 1000, errorMessage: translate('entity.validation.maxlength', { max: 1000 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="facility-equipmentBundles">
                    <Translate contentKey="recCenterManagementApp.facility.equipmentBundles">Equipment Bundles</Translate>
                  </Label>
                  <AvInput
                    id="facility-equipmentBundles"
                    type="select"
                    multiple
                    className="form-control"
                    name="equipmentBundles"
                    value={facilityEntity.equipmentBundles && facilityEntity.equipmentBundles.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {equipmentBundles
                      ? equipmentBundles.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/facility" replace color="info">
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
  reservations: storeState.reservation.entities,
  equipmentBundles: storeState.equipmentBundle.entities,
  facilityEntity: storeState.facility.entity,
  loading: storeState.facility.loading,
  updating: storeState.facility.updating,
  updateSuccess: storeState.facility.updateSuccess
});

const mapDispatchToProps = {
  getReservations,
  getEquipmentBundles,
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
)(FacilityUpdate);
