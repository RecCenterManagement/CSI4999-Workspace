import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEquipmentBundleClaim, defaultValue } from 'app/shared/model/equipment-bundle-claim.model';

export const ACTION_TYPES = {
  FETCH_EQUIPMENTBUNDLECLAIM_LIST: 'equipmentBundleClaim/FETCH_EQUIPMENTBUNDLECLAIM_LIST',
  FETCH_EQUIPMENTBUNDLECLAIM: 'equipmentBundleClaim/FETCH_EQUIPMENTBUNDLECLAIM',
  CREATE_EQUIPMENTBUNDLECLAIM: 'equipmentBundleClaim/CREATE_EQUIPMENTBUNDLECLAIM',
  UPDATE_EQUIPMENTBUNDLECLAIM: 'equipmentBundleClaim/UPDATE_EQUIPMENTBUNDLECLAIM',
  DELETE_EQUIPMENTBUNDLECLAIM: 'equipmentBundleClaim/DELETE_EQUIPMENTBUNDLECLAIM',
  RESET: 'equipmentBundleClaim/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEquipmentBundleClaim>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type EquipmentBundleClaimState = Readonly<typeof initialState>;

// Reducer

export default (state: EquipmentBundleClaimState = initialState, action): EquipmentBundleClaimState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EQUIPMENTBUNDLECLAIM_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EQUIPMENTBUNDLECLAIM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_EQUIPMENTBUNDLECLAIM):
    case REQUEST(ACTION_TYPES.UPDATE_EQUIPMENTBUNDLECLAIM):
    case REQUEST(ACTION_TYPES.DELETE_EQUIPMENTBUNDLECLAIM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_EQUIPMENTBUNDLECLAIM_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EQUIPMENTBUNDLECLAIM):
    case FAILURE(ACTION_TYPES.CREATE_EQUIPMENTBUNDLECLAIM):
    case FAILURE(ACTION_TYPES.UPDATE_EQUIPMENTBUNDLECLAIM):
    case FAILURE(ACTION_TYPES.DELETE_EQUIPMENTBUNDLECLAIM):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_EQUIPMENTBUNDLECLAIM_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_EQUIPMENTBUNDLECLAIM):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_EQUIPMENTBUNDLECLAIM):
    case SUCCESS(ACTION_TYPES.UPDATE_EQUIPMENTBUNDLECLAIM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_EQUIPMENTBUNDLECLAIM):
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

const apiUrl = 'api/equipment-bundle-claims';

// Actions

export const getEntities: ICrudGetAllAction<IEquipmentBundleClaim> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EQUIPMENTBUNDLECLAIM_LIST,
  payload: axios.get<IEquipmentBundleClaim>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IEquipmentBundleClaim> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EQUIPMENTBUNDLECLAIM,
    payload: axios.get<IEquipmentBundleClaim>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IEquipmentBundleClaim> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EQUIPMENTBUNDLECLAIM,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEquipmentBundleClaim> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EQUIPMENTBUNDLECLAIM,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEquipmentBundleClaim> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EQUIPMENTBUNDLECLAIM,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
