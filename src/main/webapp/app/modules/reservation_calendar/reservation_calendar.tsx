import './reservation_calendar.scss';

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Translate } from 'react-jhipster';
import moment from 'moment';

import { Button } from 'reactstrap';

import { getEntities } from '../../entities/reservation/reservation.reducer';
import { IRootState } from 'app/shared/reducers';
import { convertDateTimeToServer } from 'app/shared/util/date-utils';

export type IReservationCalendarStateProp = StateProps;
export type IReservationCalendarDispatchProp = DispatchProps;

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

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export const ReservationCalendarView: React.FC<Props> = props => {
  // Run on page load.
  useEffect(() => {
    props.getEntities(0, 0, '');
  }, []);

  // Run when reservation list updates.
  useEffect(() => {
    setEventList(generateEventList());
  }, [props.reservationList]);

  // English calendar localization.
  const localizer = momentLocalizer(moment);

  // Function to convert reservations fetched from API to RBC events.
  const generateEventList = () => {
    return props.reservationList.map(reservation => {
      return {
        id: reservation.id,
        title: reservation.event,
        allDay: false,
        start: convertDateTimeToServer(reservation.startTime),
        end: convertDateTimeToServer(reservation.endTime),
        desc: `${reservation.estimatedParticipants} participants`,
        facilities: [1], // reservation.facilities
        temporary: false
      };
    });
  };

  const defaultTemporaryEvent = {
    id: 9999,
    facilities: [],
    temporary: true,
    start: null,
    end: null
  };

  // State stores.
  const [eventList, setEventList] = useState(generateEventList());
  const [temporaryEvent, setTemporaryEvent] = useState(defaultTemporaryEvent);

  const clearTemporaryEvent = () => {
    setTemporaryEvent(defaultTemporaryEvent);
  };

  const fullEventList = () => [...eventList, temporaryEvent];

  const filteredEventList = () =>
    eventList.filter(event => {
      return (
        event.facilities.filter(value => {
          return getSelectedFacilities().includes(value.toString());
        }).length !== 0
      );
    });

  // Get the properties placed on each event.
  const getEventProperties = (event, start, end, isSelected) => {
    return {
      style: event.temporary
        ? {
            backgroundColor: '#909090',
            border: '2px dashed black'
          }
        : {}
    };
  };

  // Get the states of the room buttons at the top.
  const [buttonStates, setButtonStates] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false
  });

  // Create setters for each button.
  const setButtonState = key => setter => {
    setButtonStates(oldState => ({ ...oldState, [key]: setter(oldState[key]) }));
    // Clear the temporary event.
    clearTemporaryEvent();
  };

  // Is at least one button selected?
  const hasSelectedFacilities = () => Object.values(buttonStates).some(element => element);

  const getSelectedFacilities = () => Object.keys(buttonStates).filter(index => buttonStates[index]);

  // Call this when an existing event is selected.
  const handleSelectEvent = event => alert(event.title);

  const doesEventOverlap = (start, end) => {
    // Return true if there is at least one event which overlaps.
    return (
      filteredEventList().filter(event => (event.start <= start && start <= event.end) || (event.start <= end && end <= event.end))
        .length !== 0
    );
  };

  // Call this when a new event is created by click-and-drag.
  const handleSelectSlot = ({ start, end }) => {
    if (!doesEventOverlap(start, end)) {
      clearTemporaryEvent();
      const newEvent = {
        id: 1,
        title: 'Your New Reservation',
        allDay: false,
        start,
        end,
        desc: 'Click "Submit" to finalize',
        facilities: getSelectedFacilities(),
        temporary: true
      };
      setTemporaryEvent(newEvent);
      // TODO: Allow Taylor to access the data entered here (via Redux?)
    }
  };

  const today = new Date();

  const onNavigate = () => {
    // Prevent moving to old dates.
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
        <div className={`reservation-calendar-overlay reservation-calendar-overlay-${hasSelectedFacilities() ? 'enabled' : 'disabled'}`}>
          Please choose one or more room(s) to reserve.
        </div>
        <div className="reservation-calender-subtitle">Click and drag to select a time for your reservation.</div>
        <Calendar
          selectable
          localizer={localizer}
          events={[...filteredEventList(), temporaryEvent]}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          views={{ week: true }}
          defaultView="week"
          startAccessor="start"
          endAccessor="end"
          min={new Date(1900, 1, 1, 9, 0)}
          max={new Date(1900, 1, 1, 21, 0)}
          showMultiDayTimes
          eventPropGetter={getEventProperties}
          defaultDate={today}
        />
      </div>
      <div>
        <Link
          to={`/reservation/form`}
          className={`btn btn-primary ${hasSelectedFacilities() ? '' : 'disabled'} float-right jh-create-entity`}
          id="jh-create-entity"
        >
          Create Reservation
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = ({ reservation }: IRootState) => ({
  reservationList: reservation.entities, // Existing entities.
  newReservation: reservation.entity // New entity being created.
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReservationCalendarView);
