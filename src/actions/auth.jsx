import * as actionTypes from './types';
import Axios from 'axios';

const apiKey = 'AIzaSyATZ-8X7JyzjFOws-LFRycAR94FF6S3djg';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};
export const authSuccess = (idToken, localId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: localId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    payload: error,
  };
};

export const authLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => (dispatch) => {
  setTimeout(() => {
    dispatch(authLogout());
  }, expirationTime * 1000);
};

export const auth = (email, password, method) => (dispatch) => {
  dispatch(authStart());
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true,
  };
  Axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:${method}?key=${apiKey}`,
    authData
  )
    .then((response) => {
      console.log(response);
      // console.log(response.data);
      const { idToken, localId, expiresIn } = response.data;
      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

      localStorage.setItem('token', idToken);
      localStorage.setItem('userId', localId);
      localStorage.setItem('expirationDate', expirationDate);

      dispatch(authSuccess(idToken, localId));
      dispatch(checkAuthTimeout(expiresIn));
    })
    .catch((error) => {
      console.log(error);
      dispatch(authFail(error.response.data.error));
    });
  // dispatch(authSuccess({ email: email, password: password }));
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    payload: path,
  };
};

export const authCheckState = () => (dispatch) => {
  const token = localStorage.getItem('token');
  // const expirationDate = localStorage.getItem('expirationDate');
  if (!token) {
    dispatch(authLogout());
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate <= new Date()) {
      dispatch(authLogout());
    } else {
      const userId = localStorage.getItem('userId');
      dispatch(authSuccess(token, userId));
      dispatch(
        checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
};
