import * as authActionTypes from '../actionTypes/auth';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: null,
};
const authStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: true,
  };
};
const authSuccess = (state, action) => {
  return {
    ...state,
    token: action.token,
    error: null,
    loading: false,
  };
};
const authFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};
const authLogout = (state, action) => {
  return {
    ...state,
    token: null,
  };
};
const setUserId = (state, action) => {
  return {
    ...state,
    userId: action.userId,
  };
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case authActionTypes.AUTH_START:
      return authStart(state, action);
    case authActionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case authActionTypes.AUTH_FAIL:
      return authFail(state, action);
    case authActionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case authActionTypes.SET_USER_ID:
      return setUserId(state, action);
    default:
      return state;
  }
};

export default reducer;
