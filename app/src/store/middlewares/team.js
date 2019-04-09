/*
 * Npm import
*/
import axios from 'axios';
/*
 * Local import
 */

import {
  TEAMS_GET,
  TEAM_CHANNELS_GET,
  teamsReceive,
  teamChannelsReceive,
  changeTeamInProgress,
} from 'src/store/reducer';
import { TEAM_ENDPOINT, teamChannelsEndpoint } from 'src/utils/endpoints';

const createMiddleware = store => next => (action) => {
  next(action);
  switch (action.type) {
    case TEAMS_GET: {
      axios({
        url: TEAM_ENDPOINT,
        method: 'GET',
      })
        .then((response) => {
          store.dispatch(teamsReceive(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    }
    case TEAM_CHANNELS_GET: {
      if (!action.teamId) {
        break;
      }
      if (store.getState().currentTeam && action.teamId === store.getState().currentTeam.id_slack) {
        break;
      }
      store.dispatch(changeTeamInProgress());
      axios({
        url: teamChannelsEndpoint(action.teamId),
        method: 'GET',
      })
        .then((response) => {
          store.dispatch(teamChannelsReceive(response.data, action.teamId));
        })
        .catch((error) => {

        })
      break;
    }
    default:
  }
};

export default createMiddleware;
