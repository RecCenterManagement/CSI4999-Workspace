import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProfilePicture, defaultValue } from 'app/shared/model/profile-picture.model';

export const ACTION_TYPES = {
  FETCH_PROFILEPICTURE_LIST: 'profilePicture/FETCH_PROFILEPICTURE_LIST',
  FETCH_PROFILEPICTURE: 'profilePicture/FETCH_PROFILEPICTURE',
  CREATE_PROFILEPICTURE: 'profilePicture/CREATE_PROFILEPICTURE',
  UPDATE_PROFILEPICTURE: 'profilePicture/UPDATE_PROFILEPICTURE',
  DELETE_PROFILEPICTURE: 'profilePicture/DELETE_PROFILEPICTURE',
  SET_BLOB: 'profilePicture/SET_BLOB',
  RESET: 'profilePicture/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProfilePicture>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ProfilePictureState = Readonly<typeof initialState>;

// Reducer

export default (state: ProfilePictureState = initialState, action): ProfilePictureState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROFILEPICTURE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROFILEPICTURE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROFILEPICTURE):
    case REQUEST(ACTION_TYPES.UPDATE_PROFILEPICTURE):
    case REQUEST(ACTION_TYPES.DELETE_PROFILEPICTURE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PROFILEPICTURE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROFILEPICTURE):
    case FAILURE(ACTION_TYPES.CREATE_PROFILEPICTURE):
    case FAILURE(ACTION_TYPES.UPDATE_PROFILEPICTURE):
    case FAILURE(ACTION_TYPES.DELETE_PROFILEPICTURE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFILEPICTURE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFILEPICTURE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROFILEPICTURE):
    case SUCCESS(ACTION_TYPES.UPDATE_PROFILEPICTURE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROFILEPICTURE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB:
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType
        }
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/profile-pictures';

// Actions

export const getEntities: ICrudGetAllAction<IProfilePicture> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PROFILEPICTURE_LIST,
  payload: axios.get<IProfilePicture>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IProfilePicture> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROFILEPICTURE,
    payload: axios.get<IProfilePicture>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IProfilePicture> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROFILEPICTURE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProfilePicture> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROFILEPICTURE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProfilePicture> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROFILEPICTURE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
