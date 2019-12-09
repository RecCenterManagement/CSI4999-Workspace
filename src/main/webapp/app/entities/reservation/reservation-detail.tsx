import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './reservation.reducer';
import { IReservation } from 'app/shared/model/reservation.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IReservationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ReservationDetail extends React.Component<IReservationDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { reservationEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="recCenterManagementApp.reservation.detail.title">Reservation</Translate> [<b>{reservationEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="event">
                <Translate contentKey="recCenterManagementApp.reservation.event">Event</Translate>
              </span>
            </dt>
            <dd>{reservationEntity.event}</dd>
            <dt>
              <span id="estimatedParticipants">
                <Translate contentKey="recCenterManagementApp.reservation.estimatedParticipants">Estimated Participants</Translate>
              </span>
            </dt>
            <dd>{reservationEntity.estimatedParticipants}</dd>
            <dt>
              <span id="startTime">
                <Translate contentKey="recCenterManagementApp.reservation.startTime">Start Time</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={reservationEntity.startTime} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="endTime">
                <Translate contentKey="recCenterManagementApp.reservation.endTime">End Time</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={reservationEntity.endTime} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="status">
                <Translate contentKey="recCenterManagementApp.reservation.status">Status</Translate>
              </span>
            </dt>
            <dd>{reservationEntity.status}</dd>
            <dt>
              <Translate contentKey="recCenterManagementApp.reservation.user">User</Translate>
            </dt>
            <dd>{reservationEntity.user ? reservationEntity.user.id : ''}</dd>
            <dt>
              <Translate contentKey="recCenterManagementApp.reservation.facilities">Facilities</Translate>
            </dt>
            <dd>
              {reservationEntity.facilities
                ? reservationEntity.facilities.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === reservationEntity.facilities.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/reservation" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/reservation/${reservationEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ reservation }: IRootState) => ({
  reservationEntity: reservation.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReservationDetail);
