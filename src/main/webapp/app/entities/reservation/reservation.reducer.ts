import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IReservation, defaultValue } from 'app/shared/model/reservation.model';

export const ACTION_TYPES = {
  FETCH_RESERVATION_LIST: 'reservation/FETCH_RESERVATION_LIST',
  FETCH_RESERVATION: 'reservation/FETCH_RESERVATION',
  CREATE_RESERVATION: 'reservation/CREATE_RESERVATION',
  UPDATE_RESERVATION: 'reservation/UPDATE_RESERVATION',
  DELETE_RESERVATION: 'reservation/DELETE_RESERVATION',
  RESET: 'reservation/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IReservation>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ReservationState = Readonly<typeof initialState>;

// Reducer

export default (state: ReservationState = initialState, action): ReservationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_RESERVATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RESERVATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_RESERVATION):
    case REQUEST(ACTION_TYPES.UPDATE_RESERVATION):
    case REQUEST(ACTION_TYPES.DELETE_RESERVATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_RESERVATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RESERVATION):
    case FAILURE(ACTION_TYPES.CREATE_RESERVATION):
    case FAILURE(ACTION_TYPES.UPDATE_RESERVATION):
    case FAILURE(ACTION_TYPES.DELETE_RESERVATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_RESERVATION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_RESERVATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_RESERVATION):
    case SUCCESS(ACTION_TYPES.UPDATE_RESERVATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_RESERVATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/reservations';

// Actions

export const getEntities: ICrudGetAllAction<IReservation> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_RESERVATION_LIST,
    payload: axios.get<IReservation>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IReservation> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RESERVATION,
    payload: axios.get<IReservation>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IReservation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RESERVATION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IReservation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_RESERVATION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IReservation> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RESERVATION,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
