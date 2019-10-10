import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEquipmentReservation, defaultValue } from 'app/shared/model/equipment-reservation.model';

export const ACTION_TYPES = {
  FETCH_EQUIPMENTRESERVATION_LIST: 'equipmentReservation/FETCH_EQUIPMENTRESERVATION_LIST',
  FETCH_EQUIPMENTRESERVATION: 'equipmentReservation/FETCH_EQUIPMENTRESERVATION',
  CREATE_EQUIPMENTRESERVATION: 'equipmentReservation/CREATE_EQUIPMENTRESERVATION',
  UPDATE_EQUIPMENTRESERVATION: 'equipmentReservation/UPDATE_EQUIPMENTRESERVATION',
  DELETE_EQUIPMENTRESERVATION: 'equipmentReservation/DELETE_EQUIPMENTRESERVATION',
  RESET: 'equipmentReservation/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEquipmentReservation>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type EquipmentReservationState = Readonly<typeof initialState>;

// Reducer

export default (state: EquipmentReservationState = initialState, action): EquipmentReservationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EQUIPMENTRESERVATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EQUIPMENTRESERVATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_EQUIPMENTRESERVATION):
    case REQUEST(ACTION_TYPES.UPDATE_EQUIPMENTRESERVATION):
    case REQUEST(ACTION_TYPES.DELETE_EQUIPMENTRESERVATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_EQUIPMENTRESERVATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EQUIPMENTRESERVATION):
    case FAILURE(ACTION_TYPES.CREATE_EQUIPMENTRESERVATION):
    case FAILURE(ACTION_TYPES.UPDATE_EQUIPMENTRESERVATION):
    case FAILURE(ACTION_TYPES.DELETE_EQUIPMENTRESERVATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_EQUIPMENTRESERVATION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_EQUIPMENTRESERVATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_EQUIPMENTRESERVATION):
    case SUCCESS(ACTION_TYPES.UPDATE_EQUIPMENTRESERVATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_EQUIPMENTRESERVATION):
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

const apiUrl = 'api/equipment-reservations';

// Actions

export const getEntities: ICrudGetAllAction<IEquipmentReservation> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EQUIPMENTRESERVATION_LIST,
  payload: axios.get<IEquipmentReservation>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IEquipmentReservation> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EQUIPMENTRESERVATION,
    payload: axios.get<IEquipmentReservation>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IEquipmentReservation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EQUIPMENTRESERVATION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEquipmentReservation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EQUIPMENTRESERVATION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEquipmentReservation> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EQUIPMENTRESERVATION,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
