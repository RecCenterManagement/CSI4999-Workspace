import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEquipment, defaultValue } from 'app/shared/model/equipment.model';

export const ACTION_TYPES = {
  FETCH_EQUIPMENT_LIST: 'equipment/FETCH_EQUIPMENT_LIST',
  FETCH_EQUIPMENT: 'equipment/FETCH_EQUIPMENT',
  CREATE_EQUIPMENT: 'equipment/CREATE_EQUIPMENT',
  UPDATE_EQUIPMENT: 'equipment/UPDATE_EQUIPMENT',
  DELETE_EQUIPMENT: 'equipment/DELETE_EQUIPMENT',
  RESET: 'equipment/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEquipment>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type EquipmentState = Readonly<typeof initialState>;

// Reducer

export default (state: EquipmentState = initialState, action): EquipmentState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EQUIPMENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EQUIPMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_EQUIPMENT):
    case REQUEST(ACTION_TYPES.UPDATE_EQUIPMENT):
    case REQUEST(ACTION_TYPES.DELETE_EQUIPMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_EQUIPMENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EQUIPMENT):
    case FAILURE(ACTION_TYPES.CREATE_EQUIPMENT):
    case FAILURE(ACTION_TYPES.UPDATE_EQUIPMENT):
    case FAILURE(ACTION_TYPES.DELETE_EQUIPMENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_EQUIPMENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_EQUIPMENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_EQUIPMENT):
    case SUCCESS(ACTION_TYPES.UPDATE_EQUIPMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_EQUIPMENT):
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

const apiUrl = 'api/equipment';

// Actions

export const getEntities: ICrudGetAllAction<IEquipment> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EQUIPMENT_LIST,
  payload: axios.get<IEquipment>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IEquipment> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EQUIPMENT,
    payload: axios.get<IEquipment>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IEquipment> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EQUIPMENT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEquipment> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EQUIPMENT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEquipment> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EQUIPMENT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
