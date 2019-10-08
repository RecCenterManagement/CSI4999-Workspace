import './reservation_calendar.scss';

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';

import { Row, Col, Alert, Button, Container, Form, Media } from 'reactstrap';

import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { getEntities } from '../../entities/reservation/reservation.reducer';
import { IRootState } from 'app/shared/reducers';
import { convertDateTimeToServer } from 'app/shared/util/date-utils';

export type IReservationCalendarStateProp = StateProps;

const DragAndDropCalendar = withDragAndDrop(Calendar);

const ToggleButton = ({ room_name, state, setState }) => {
  const onClick = () => {
    setState(oldState => !oldState);
  };

  return (
    <Button className={`toggle-button-room toggle-button-${state ? 'true' : 'false'}`} onClick={onClick} block>
      <span>{room_name}</span>
    </Button>
  );
};

const defaultEvents = [
  {
    id: 14,
    title: 'Today',
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3))
  },
  {
    id: 15,
    title: 'Point in Time Event',
    start: new Date(),
    end: new Date()
  }
];

const ReservationCalendarView = (props: IReservationCalendarStateProp) => {
  // Run on page load.
  useEffect(() => {
    props.getEntities();
  }, []);

  /*
  props.reservationList.map(reservation => {
            return {
              id: reservation.id,
              allDay: false,
              title: reservation.event,
              start: convertDateTimeToServer(reservation.startTime),
              end: convertDateTimeToServer(reservation.endTime),
              desc: `${reservation.estimatedParticipants} participants`
            };
          })
          */

  // English calendar localization.
  const localizer = momentLocalizer(moment);

  const [eventList, setEventList] = useState(defaultEvents);

  const [buttonStates, setButtonStates] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false
  });

  const clearTemporaryEvents = () => {
    setEventList(oldEventList =>
      oldEventList.filter(event => {
        return !('temporary' in event);
      })
    );
  };

  const setButtonState = key => setter => {
    setButtonStates(oldState => ({ ...oldState, [key]: setter(oldState[key]) }));
    clearTemporaryEvents();
  };

  const hasSelected = () => Object.values(buttonStates).some(element => element);

  const handleSelectEvent = event => alert(event.title);

  const handleSelectSlot = ({ start, end }) => {
    clearTemporaryEvents();
    const newEvent = {
      id: 1,
      start,
      end,
      title: 'Your New Reservation',
      temporary: true
    };
    setEventList(oldEvents => [...oldEvents, newEvent]);
  };

  return (
    <div style={{ padding: '36px 0' }}>
      <div className="toggle-button-grid">
        <div className="toggle-button-column">
          <ToggleButton state={buttonStates['1']} setState={setButtonState('1')} room_name="Rec Gym Court 1" />
          <ToggleButton state={buttonStates['2']} setState={setButtonState('2')} room_name="Rec Gym Court 2" />
          <ToggleButton state={buttonStates['3']} setState={setButtonState('3')} room_name="Rec Gym Court 3" />
        </div>
        <div className="toggle-button-column">
          <ToggleButton state={buttonStates['4']} setState={setButtonState('4')} room_name="Activity Center" />
          <ToggleButton state={buttonStates['5']} setState={setButtonState('5')} room_name="Studio 919" />
        </div>
        <div className="toggle-button-column">
          <ToggleButton state={buttonStates['6']} setState={setButtonState('6')} room_name="Racquetball Court" />
          <ToggleButton state={buttonStates['7']} setState={setButtonState('7')} room_name="David E. Herman Room" />
        </div>
      </div>
      <div className="reservation-calendar-wrapper">
        <div className={`reservation-calendar-overlay reservation-calendar-overlay-${hasSelected() ? 'enabled' : 'disabled'}`}>
          Please choose one or more room(s) to reserve.
        </div>
        <div className="reservation-calender-subtitle">Click and drag to select a time for your reservation.</div>
        <Calendar
          selectable
          localizer={localizer}
          events={eventList}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          views={{ week: true }}
          defaultView="week"
          startAccessor="start"
          endAccessor="end"
          showMultiDayTimes
          defaultDate={new Date()}
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({ reservation }: IRootState) => ({
  reservationList: reservation.entities,
  getEntities
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(ReservationCalendarView);
