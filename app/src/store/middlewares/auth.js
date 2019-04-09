/*
 * Npm import
*/
import axios from 'axios';
import { push } from 'connected-react-router';
/*
 * Local import
 */

import {
  CHECK_AUTH,
  LOGIN_SEND,
  authStatus,
  userDetailsReceived,
  authExpired,
  authSuccess,
} from 'src/store/reducer';
import { websocketConnect } from 'src/store/reducers/websocket';
import { USER_DATA, JSON_LOGIN } from 'src/utils/endpoints';

let axiosInterceptors = false;
let axiosInterceptorsResponse = false;
const createMiddleware = store => next => (action) => {

  const { token } = store.getState().reducer;
  if (axiosInterceptors === false && token) {
    axios.interceptors.request.use((config) => {
      // Do something before request is sent
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }, (error) => {
      // Do something with request error
      return Promise.reject(error);
    });
    axiosInterceptors = true;
  }
  if (axiosInterceptorsResponse === false && token) {
    axios.interceptors.response.use(response => (
      response
    ), (error) => {
      // Do something with response error
      if (error.response.status === 401) {
        store.dispatch(authExpired());
      }
      return Promise.reject(error);
    });
    axiosInterceptorsResponse = true;
  }


  next(action);
  switch (action.type) {
    case CHECK_AUTH: {
      axios({
        method: 'GET',
        url: USER_DATA,
      })
        .then((response) => {
          store.dispatch(authStatus(true));
          store.dispatch(userDetailsReceived(JSON.parse(response.data)));
          store.dispatch(websocketConnect());
        })
        .catch((error) => {
          if (error.response.status === 401) {
            store.dispatch(authStatus(false));
            //store.dispatch(push('/login'));
          }
        });
      break;
    }
    case LOGIN_SEND: {
      const { credentials } = action;
      if (!credentials.username || !credentials.password) {
        break;
      }
      const logins = {
        username: credentials.username,
        password: credentials.password,
      };
      axios({
        method: 'POST',
        url: JSON_LOGIN,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(logins),
      })
        .then((response) => {
          store.dispatch(authSuccess(response.data.token));
        })
        .catch((error) => {})
      break;
    }
    default:
  }
};

export default createMiddleware;
