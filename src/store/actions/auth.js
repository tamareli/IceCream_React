import * as actionTypes from '../actionTypes/auth';
import axios from 'axios';
import qs from 'qs';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expireDate');
  localStorage.removeItem('cartItems');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};
export const checkAuthTimeOut = (expireTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expireTime * 1000);
  };
};
export const auth = (email, password, path) => {
  console.log('auth');
  return (dispatch) => {
    dispatch(authStart());
    let body = qs.stringify({
      username: email,
      password: password,
      grant_type: 'password',
    });
    let header = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    axios
      .post('https://localhost:44300/token', body, header)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('expireDate', response.data['.expires']);
        dispatch(authSuccess(response.data.access_token));
        dispatch(checkAuthTimeOut(response.data.expires_in));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err.response.data.error_description));
      });
  };
};
export const setUserId = (id) => {
  return {
    type: actionTypes.SET_USER_ID,
    id: id,
  };
};
export const authCheckState = () => {
  return (dispatch) => {
    console.log('app');
    let token = localStorage.getItem('token');
    if (!token) {
      console.log('!token');
      dispatch(logout());
    } else {
      let expireDate = new Date(localStorage.getItem('expireDate'));
      if (expireDate > new Date()) {
        dispatch(authSuccess(token));
        dispatch(
          checkAuthTimeOut((expireDate.getTime() - new Date().getTime()) / 1000)
        );
      } else {
        dispatch(logout());
      }
    }
  };
};
