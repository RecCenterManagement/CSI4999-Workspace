import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntities as getFacilities } from 'app/entities/facility/facility.reducer';
import { getEntity, updateEntity, createEntity, reset } from '../../entities/reservation/reservation.reducer';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IReservationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IReservationUpdateState {
  isNew: boolean;
  idsfacilities: any[];
  userId: string;
}

export class ReservationFormView extends React.Component<IReservationUpdateProps, IReservationUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsfacilities: [],
      userId: '0',
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

    this.props.getUsers();
    this.props.getFacilities();
  }

  saveEntity = (event, errors, values) => {
    values.startTime = convertDateTimeToServer(values.startTime);
    values.endTime = convertDateTimeToServer(values.endTime);

    if (errors.length === 0) {
      const { reservationEntity } = this.props;
      const entity = {
        ...reservationEntity,
        ...values,
        facilities: mapIdList(values.facilities)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/reservation');
  };

  render() {
    const { reservationEntity, users, facilities, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="recCenterManagementApp.reservation.home.createOrEditLabel">
              <Translate contentKey="recCenterManagementApp.reservation.home.createOrEditLabel">Create or edit a Reservation</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : reservationEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="reservation-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="reservation-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="eventLabel" for="reservation-event">
                    <Translate contentKey="recCenterManagementApp.reservation.event">Event</Translate>
                  </Label>
                  <AvField
                    id="reservation-event"
                    type="text"
                    name="event"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="estimatedParticipantsLabel" for="reservation-estimatedParticipants">
                    <Translate contentKey="recCenterManagementApp.reservation.estimatedParticipants">Estimated Participants</Translate>
                  </Label>
                  <AvField
                    id="reservation-estimatedParticipants"
                    type="string"
                    className="form-control"
                    name="estimatedParticipants"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="startTimeLabel" for="reservation-startTime">
                    <Translate contentKey="recCenterManagementApp.reservation.startTime">Start Time</Translate>
                  </Label>
                  <AvInput
                    id="reservation-startTime"
                    type="datetime-local"
                    className="form-control"
                    name="startTime"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.reservationEntity.startTime)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="endTimeLabel" for="reservation-endTime">
                    <Translate contentKey="recCenterManagementApp.reservation.endTime">End Time</Translate>
                  </Label>
                  <AvInput
                    id="reservation-endTime"
                    type="datetime-local"
                    className="form-control"
                    name="endTime"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.reservationEntity.endTime)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="reservation-user">
                    <Translate contentKey="recCenterManagementApp.reservation.user">User</Translate>
                  </Label>
                  <AvInput id="reservation-user" type="select" className="form-control" name="user.id">
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="reservation-facilities">
                    <Translate contentKey="recCenterManagementApp.reservation.facilities">Facilities</Translate>
                  </Label>
                  <AvInput
                    id="reservation-facilities"
                    type="select"
                    multiple
                    className="form-control"
                    name="facilities"
                    disabled
                    value={reservationEntity.facilities}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/reservation" replace color="info">
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
  users: storeState.userManagement.users,
  facilities: storeState.facility.entities,
  reservationEntity: storeState.reservation.entity,
  loading: storeState.reservation.loading,
  updating: storeState.reservation.updating,
  updateSuccess: storeState.reservation.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getFacilities,
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
)(ReservationFormView);
