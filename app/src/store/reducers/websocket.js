/*
 * Npm import
 */


/*
 * Local import
 */


/*
 * Initial state
 */
const initialState = {
  chatMessages: [],
};

/*
 * Actions
 */

export const WEBSOCKET_CONNECT = 'WEBSOCKET_CONNECT';

export const NEW_EVENT_RECEIVED = 'NEW_EVENT_RECEIVED';
export const NEW_MESSAGE = 'NEW_MESSAGE';
export const SEND_MESSAGE = 'SEND_MESSAGE';

/*
 * Reducer
 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_MESSAGE: {
      const newMessage = {
        content: action.message.content,
        author_name: action.message.author_name,
      };

      return {
        ...state,
        chatMessages: [...state.chatMessages, newMessage],
      };
    }
    default:
      return state;
  }
};

/*
 * Action creator
 */


export const websocketConnect = () => ({
  type: WEBSOCKET_CONNECT,
});
export const newEventReceived = event => ({
  type: NEW_EVENT_RECEIVED,
  event,
});
export const newMessage = message => ({
  type: NEW_MESSAGE,
  message,
});
export const sendMessage = message => ({
  type: SEND_MESSAGE,
  message,
});

/*
 * Export default
 */
export default reducer;
