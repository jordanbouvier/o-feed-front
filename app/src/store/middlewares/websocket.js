/*
 * Npm import
*/
import axios from 'axios';
import { push } from 'connected-react-router';
/*
 * Local import
 */

import {
  WEBSOCKET_CONNECT,
  NEW_EVENT_RECEIVED,
  SEND_MESSAGE,
  newEventReceived, newMessage,
} from 'src/store/reducers/websocket';
import { WS_URL } from 'src/utils/endpoints';

let ws = null;
const createMiddleware = store => next => (action) => {
  next(action);
  switch (action.type) {
    case WEBSOCKET_CONNECT: {
      const { user } = store.getState().reducer;
      if (!user || !user.token) {
        break;
      }
      ws = new WebSocket(`ws://${WS_URL}`);
      const data = {
        event: 'login',
        data: {
          user: {
            token: user.token,
          },
        },
      };
      ws.onopen = (evt) => {
        ws.send(JSON.stringify(data));
      };
      ws.onmessage = (evt) => {
        store.dispatch(newEventReceived(evt.data));
      };
      //
      break;
    }
    case NEW_EVENT_RECEIVED: {
      const event = JSON.parse(action.event);
      if (!event || !event.event || !event.message) {
        break;
      }
      switch (event.event) {
        case 'NEW_MESSAGE': {
          const { message } = event;
          store.dispatch(newMessage(message));
          break;
        }
        default:
      }
      break;
    }
    case SEND_MESSAGE: {
      const { user } = store.getState().reducer;
      if (!user || !user.token || ws === null) {
        break;
      }
      if (!action.message && action.message === '') {
        break;
      }
      const data = {
        event: 'NEW_MESSAGE',
        data: {
          user: {
            token: user.token,
          },
          message: {
            content: action.message,
          },
        },
      };
      ws.send(JSON.stringify(data));
      break;
    }
    default:
  }
};

export default createMiddleware;
