import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEquipment } from 'app/shared/model/equipment.model';
import { getEntities as getEquipment } from 'app/entities/equipment/equipment.reducer';
import { getEntity, updateEntity, createEntity, reset } from './equipment-reservation.reducer';
import { IEquipmentReservation } from 'app/shared/model/equipment-reservation.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEquipmentReservationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IEquipmentReservationUpdateState {
  isNew: boolean;
  equipmentId: string;
}

export class EquipmentReservationUpdate extends React.Component<IEquipmentReservationUpdateProps, IEquipmentReservationUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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

    this.props.getEquipment();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { equipmentReservationEntity } = this.props;
      const entity = {
        ...equipmentReservationEntity,
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
    this.props.history.push('/entity/equipment-reservation');
  };

  render() {
    const { equipmentReservationEntity, equipment, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="recCenterManagementApp.equipmentReservation.home.createOrEditLabel">
              <Translate contentKey="recCenterManagementApp.equipmentReservation.home.createOrEditLabel">
                Create or edit a EquipmentReservation
              </Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : equipmentReservationEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="equipment-reservation-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="equipment-reservation-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="countLabel" for="equipment-reservation-count">
                    <Translate contentKey="recCenterManagementApp.equipmentReservation.count">Count</Translate>
                  </Label>
                  <AvField
                    id="equipment-reservation-count"
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
                  <Label for="equipment-reservation-equipment">
                    <Translate contentKey="recCenterManagementApp.equipmentReservation.equipment">Equipment</Translate>
                  </Label>
                  <AvInput
                    id="equipment-reservation-equipment"
                    type="select"
                    className="form-control"
                    name="equipment.id"
                    value={isNew ? equipment[0] && equipment[0].id : equipmentReservationEntity.equipment.id}
                    required
                  >
                    {equipment
                      ? equipment.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvFeedback>
                    <Translate contentKey="entity.validation.required">This field is required.</Translate>
                  </AvFeedback>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/equipment-reservation" replace color="info">
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
  equipment: storeState.equipment.entities,
  equipmentReservationEntity: storeState.equipmentReservation.entity,
  loading: storeState.equipmentReservation.loading,
  updating: storeState.equipmentReservation.updating,
  updateSuccess: storeState.equipmentReservation.updateSuccess
});

const mapDispatchToProps = {
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
)(EquipmentReservationUpdate);
