import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEquipmentBundle, defaultValue } from 'app/shared/model/equipment-bundle.model';

export const ACTION_TYPES = {
  FETCH_EQUIPMENTBUNDLE_LIST: 'equipmentBundle/FETCH_EQUIPMENTBUNDLE_LIST',
  FETCH_EQUIPMENTBUNDLE: 'equipmentBundle/FETCH_EQUIPMENTBUNDLE',
  CREATE_EQUIPMENTBUNDLE: 'equipmentBundle/CREATE_EQUIPMENTBUNDLE',
  UPDATE_EQUIPMENTBUNDLE: 'equipmentBundle/UPDATE_EQUIPMENTBUNDLE',
  DELETE_EQUIPMENTBUNDLE: 'equipmentBundle/DELETE_EQUIPMENTBUNDLE',
  RESET: 'equipmentBundle/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEquipmentBundle>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type EquipmentBundleState = Readonly<typeof initialState>;

// Reducer

export default (state: EquipmentBundleState = initialState, action): EquipmentBundleState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EQUIPMENTBUNDLE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EQUIPMENTBUNDLE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_EQUIPMENTBUNDLE):
    case REQUEST(ACTION_TYPES.UPDATE_EQUIPMENTBUNDLE):
    case REQUEST(ACTION_TYPES.DELETE_EQUIPMENTBUNDLE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_EQUIPMENTBUNDLE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EQUIPMENTBUNDLE):
    case FAILURE(ACTION_TYPES.CREATE_EQUIPMENTBUNDLE):
    case FAILURE(ACTION_TYPES.UPDATE_EQUIPMENTBUNDLE):
    case FAILURE(ACTION_TYPES.DELETE_EQUIPMENTBUNDLE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_EQUIPMENTBUNDLE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_EQUIPMENTBUNDLE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_EQUIPMENTBUNDLE):
    case SUCCESS(ACTION_TYPES.UPDATE_EQUIPMENTBUNDLE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_EQUIPMENTBUNDLE):
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

const apiUrl = 'api/equipment-bundles';

// Actions

export const getEntities: ICrudGetAllAction<IEquipmentBundle> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EQUIPMENTBUNDLE_LIST,
  payload: axios.get<IEquipmentBundle>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IEquipmentBundle> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EQUIPMENTBUNDLE,
    payload: axios.get<IEquipmentBundle>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IEquipmentBundle> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EQUIPMENTBUNDLE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEquipmentBundle> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EQUIPMENTBUNDLE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEquipmentBundle> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EQUIPMENTBUNDLE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
