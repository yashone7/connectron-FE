import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  CREATE_USER,
  CREATE_USER_ERROR,
} from "../actions/types/actionTypes";

const initialState = {
  isAuthenticated: null,
  user: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: payload.user,
        loading: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        user: payload.user,
        loading: false,
      };
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    case CREATE_USER:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
      };
    case CREATE_USER_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        loading: true,
      };
    default:
      return state;
  }
}
