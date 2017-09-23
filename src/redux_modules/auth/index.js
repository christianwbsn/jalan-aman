/* eslint-disable */
import request from 'superagent';

const AT = {
  LOGIN_REQUEST: 'app/auth/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'app/auth/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'app/auth/LOGIN_FAILURE',
  LOGOUT_REQUEST: 'app/auth/LOGOUT_REQUEST',
  LOGOUT_SUCCESS: 'app/auth/LOGOUT_SUCCESS',
  LOGOUT_FAILURE: 'app/auth/LOGOUT_FAILURE',
  REGISTER_REQUEST: 'app/auth/REGISTER_REQUEST',
  REGISTER_SUCCESS: 'app/auth/REGISTER_SUCCESS',
  REGISTER_FAILURE: 'app/auth/REGISTER_FAILURE',
};

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

const initialState = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('auth') ? true : false,
  user: {},
  errorMessage: '',
  isRegisterFailed: false,
  isRegisterSuccess: false,
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case AT.LOGIN_REQUEST:
      return { ...state, isFetching: true, isAuthenticated: false, user: action.creds };
    case AT.LOGIN_SUCCESS:
      return { ...state, isFetching: false, isAuthenticated: true, errorMessage: '' };
    case AT.LOGIN_FAILURE:
      return { ...state, isFetching: false, isAuthenticated: false, errorMessage: action.message };
    case AT.LOGOUT_REQUEST:
      return { ...state, isFetching: true, isAuthenticated: true };
    case AT.LOGOUT_SUCCESS:
      return { ...state, isFetching: false, isAuthenticated: false };
    case AT.REGISTER_REQUEST:
      return { ...state, isFetching: true, isAuthenticated: false, user: action.creds };
    case AT.REGISTER_SUCCESS:
      return { ...state, isFetching: false, isAuthenticated: true, errorMessage: '' };
    case AT.REGISTER_FAILURE:
      return { ...state, isFetching: false, isAuthenticated: false, errorMessage: action.message };
    default:
      return state;
  }
}

// Action Creator

// LOGIN
function requestLogin(creds) {
  return {
    type: AT.LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds,
  };
}

function receiveLogin(user) {
  return {
    type: AT.LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    auth: user.auth,
    refresh: user.refresh
  };
}

function loginError(message) {
  return {
    type: AT.LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message,
  };
}

function toFormData(j) {
  const form_data = new FormData();
  for (let key in j) {
      form_data.append(key, j[key]);
  }
  return form_data;
}

export function loginUser(creds) {
  let config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: {
      username: creds.username,
      password: creds.password
    }
  };

  const user = toFormData(creds);
  return dispatch => {
    dispatch(requestLogin(creds));
    return request.post('http://api.jalanaman.ga/user/login')
      .send(user)
      .end((err, res) => {
        if (err) {
          console.log('LOGIN ERROR: ', err);
          dispatch(loginError(err));
        } else {
          try {
            const result = JSON.parse(res.text);
            if (result.status != 200) {
              dispatch(loginError('Email/password is incorrect!'));
            } else {
              const data = result.data;
              console.log('RESULT BOIII');
              console.log(data);
              const user = {
                username: data.username,
                auth: data.auth,
                refresh: data.refresh
              }
              localStorage.setItem('auth', data.auth);
              localStorage.setItem('refresh', data.refresh);
              dispatch(receiveLogin(user))
            }
          } catch (err) {
            console.log('LOGIN ERROR: ', err);
            dispatch(loginError(err));
          }
        }
      });
  }
}


// REGISTER
function requestRegister(creds) {
  return {
    type: AT.REGISTER_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds,
  };
}

function receiveRegister(user) {
  return {
    type: AT.REGISTER_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    auth: user.auth,
    refresh: user.refresh
  };
}

function registerError(message) {
  return {
    type: AT.REGISTER_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message,
  };
}

export function registerUser(creds) {
  const user = toFormData(creds);
  console.log(user);
  return dispatch => {
    dispatch(requestLogin(creds));
    return request.post('http://api.jalanaman.ga/user/register')
      .send(user)
      .end((err, res) => {
        if (err) {
          console.log('REGISTER ERROR: ', err);
          dispatch(registerError(err));
        } else {
          try {
            const result = JSON.parse(res.text);
            if (result.status != 200) {
              dispatch(registerError('Registration form invalid!'));
            } else {
              const data = result.data;
              console.log('RESULT BOIII');
              console.log(data);
              const user = {
                username: data.username,
                auth: data.auth,
                refresh: data.refresh
              }
              localStorage.setItem('auth', data.auth);
              localStorage.setItem('refresh', data.refresh);
              dispatch(receiveRegister(user))
            }
          } catch (err) {
            console.log('REGISTER ERROR: ', err);
            dispatch(registerError(err));
          }
        }
      });
  }
}


// LOGOUT

function requestLogout() {
  return {
    type: AT.LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: AT.LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem('auth');
    localStorage.removeItem('refresh');
    dispatch(receiveLogout());
  }
}

// Thunk
// export function delayedIncrementCounter() {
//   return async dispatch => {
//     dispatch(loadingCounter());
//     const promise = new Promise(resolve => setTimeout(resolve, 500));
//     await promise;
//     dispatch(incrementCounter());
//     dispatch(doneCounter());
//   };
// }

// export function login() {
//   return async dispatch => {
//     dispatch(loadingAuth());
//     const promise = new Promise((resolve, reject) => {
//       // TEMBAKKK
//     });
//     await promise;
//     if (promise.err) {
//       // handle err
//     } else {
//       dispatch()
//     }
//   };
// }
