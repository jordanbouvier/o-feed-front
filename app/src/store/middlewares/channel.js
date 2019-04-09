/*
 * Npm import
*/
import axios from 'axios';
/*
 * Local import
 */

import {
  CHANNEL_MESSAGES_GET,
  CHANNEL_MESSAGES_GET_MORE,
  channelDetailsReceive,
  changeChannelInProgress,
} from 'src/store/reducer';
import { channelDetailsWithMessage } from 'src/utils/endpoints';

const createMiddleware = store => next => (action) => {
  next(action);
  switch (action.type) {
    case CHANNEL_MESSAGES_GET: {
      if (!action.channelId) {
        break;
      }
      const { currentChannel } = store.getState().reducer;
      if (currentChannel && action.channelId === currentChannel.id_slack) {
        break;
      }
      store.dispatch(changeChannelInProgress());
      axios({
        url: channelDetailsWithMessage(action.channelId),
        method: 'GET',
      })
        .then((response) => {
          store.dispatch(channelDetailsReceive(response.data));
        })
        .catch((error) => {});
      break;
    }
    case CHANNEL_MESSAGES_GET_MORE: {
      const { currentChannel } = store.getState().reducer;
      if (!action.channelId || !currentChannel || !currentChannel.has_more) {
        break;
      }
      const page = currentChannel.current_page + 1;
      const url = `${channelDetailsWithMessage(action.channelId)}?page=${page}`;
      axios({
        url,
        method: 'GET',
      })
        .then((response) => {
          const newChannelDetails = {
            ...currentChannel,
            ...response.data,
            messages: [
              ...response.data.messages,
              ...currentChannel.messages,
            ],
          };
          store.dispatch(channelDetailsReceive(newChannelDetails));
        });
      break;
    }
    default:
  }
};

export default createMiddleware;
