/*
 * Npm import
 */
import { push } from 'connected-react-router';

/*
 * Local import
 */


/*
 * Initial state
 */
const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;
const isLoggedIn = token !== null;

const initialState = {
  teams: [],
  channelDetailsOpen: false,
  searchResult: false,
  userList: [],
  userDetailsOpened: false,
  teamListLoaded: false,
  changeChannelInProgress: false,
  changeTeamInProgress: false,
  closeTeamListChannel: false,
  isLoggedIn,
  user: null,
  token,
};

/*
 * Actions
 */

export const TEAMS_GET = 'TEAMS_GET';
export const TEAMS_RECEIVE = 'TEAMS_RECEIVE';

export const TEAM_CHANNELS_GET = 'TEAM_CHANNELS_GET';
export const TEAM_CHANNELS_RECEIVE = 'TEAM_CHANNELS_RECEIVE';

export const CHANNEL_MESSAGES_GET = 'CHANNEL_MESSAGES_GET';
export const CHANNEL_MESSAGES_GET_MORE = 'CHANNEL_MESSAGES_GET_MORE';
export const CHANNEL_DETAILS_RECEIVE = 'CHANNEL_DETAILS_RECEIVE';
export const CHANNEL_DETAILS_TOGGLE = 'CHANNEL_DETAILS_TOGGLE';

export const MESSAGE_SEARCH = 'MESSAGE_SEARCH';
export const MESSAGE_SEARCH_RESULTS = 'MESSAGE_SEARCH_RESULTS';
export const MESSAGE_SEARCH_MORE = 'MESSAGE_SEARCH_MORE';

export const OPEN_USER_DETAILS = 'OPEN_USER_DETAILS';
export const CLOSE_USER_DETAILS = 'CLOSE_USER_DETAILS';

export const CHANGE_CHANNEL_IN_PROGRESS = 'CHANGE_CHANNEL_IN_PROGRESS';
export const CHANGE_TEAM_IN_PROGRESS = 'CHANGE_TEAM_IN_PROGRESS';

export const TOGGLE_TEAM_LIST_CHANNEL = 'TOGGLE_TEAM_LIST_CHANNEL';

export const CHECK_AUTH = 'CHECK_AUTH';
export const AUTH_STATUS = 'AUTH_STATUS';

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_EXPIRED = 'AUTH_EXPIRED';

export const LOGIN_SEND = 'LOGIN_SEND';
export const USER_DETAILS_RECEIVED = 'USER_DETAILS_RECEIVED';

/*
 * Reducer
 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TEAMS_RECEIVE: {
      return {
        ...state,
        teams: action.teams,
        teamListLoaded: true,
      };
    }
    case TEAM_CHANNELS_RECEIVE: {
      const currentTeam = state.teams.find(team => team.id_slack === action.teamId);
      currentTeam.channels = action.channels;
      return {
        ...state,
        currentTeam,
        changeTeamInProgress: false,
        currentChannel: null,
      };
    }
    case CHANNEL_DETAILS_RECEIVE: {
      return {
        ...state,
        currentChannel: action.channelDetails,
        userList: action.channelDetails.channel.users,
        changeChannelInProgress: false,
      };
    }
    case CHANNEL_DETAILS_TOGGLE: {
      return {
        ...state,
        channelDetailsOpen: !state.channelDetailsOpen,
      };
    }
    case MESSAGE_SEARCH_RESULTS: {
      let userList = [];
      state.teams.forEach((team) => {
        userList = [...userList, ...team.users];
      });
      return {
        ...state,
        searchResult: {
          ...action.messages,
          searchQuery: action.query,
        },
        userList,
      };
    }
    case OPEN_USER_DETAILS: {
      const userInfo = state.userList.find(user => user.id_slack === action.userId);
      if (!userInfo) {
        return {
          ...state,
        };
      }
      const userCardDetails = {
        user: userInfo,
        clientX: action.clientX,
        clientY: action.clientY,
      };
      return {
        ...state,
        userDetailsOpened: true,
        userCardDetails,
      };
    }
    case CLOSE_USER_DETAILS: {
      return {
        ...state,
        userDetailsOpened: false,
      };
    }
    case CHANGE_CHANNEL_IN_PROGRESS: {
      return {
        ...state,
        changeChannelInProgress: true,
      };
    }
    case CHANGE_TEAM_IN_PROGRESS: {
      return {
        ...state,
        changeTeamInProgress: true,
      };
    }
    case TOGGLE_TEAM_LIST_CHANNEL: {
      return {
        ...state,
        closeTeamListChannel: !state.closeTeamListChannel,
      };
    }
    case AUTH_STATUS: {
      return {
        ...state,
        isLoggedIn: action.authResponse,
      };
    }
    case AUTH_SUCCESS: {
      localStorage.setItem('token', action.token);
      return {
        ...state,
        isLoggedIn: true,
        token: action.token,
      };
    }
    case AUTH_EXPIRED: {
      localStorage.removeItem('token');
      return {
        ...state,
        isLoggedIn: false,
        token: null,
      };
    }
    case USER_DETAILS_RECEIVED: {
      return {
        ...state,
        user: action.user,
      };
    }
    default:
      return state;
  }
};

/*
 * Action creator
 */


export const teamsGet = () => ({
  type: TEAMS_GET,
});
export const teamsReceive = teams => ({
  type: TEAMS_RECEIVE,
  teams,
});
export const teamChannelsGet = teamId => ({
  type: TEAM_CHANNELS_GET,
  teamId,
});
export const teamChannelsReceive = (channels, teamId) => ({
  type: TEAM_CHANNELS_RECEIVE,
  channels,
  teamId,
});
export const channelMessagesGet = channelId => ({
  type: CHANNEL_MESSAGES_GET,
  channelId,
});
export const channelMessageGetMore = channelId => ({
  type: CHANNEL_MESSAGES_GET_MORE,
  channelId,
});
export const channelDetailsReceive = channelDetails => ({
  type: CHANNEL_DETAILS_RECEIVE,
  channelDetails,
});
export const channelDetailsToggle = () => ({
  type: CHANNEL_DETAILS_TOGGLE,
});
export const messageSearch = searchProperties => ({
  type: MESSAGE_SEARCH,
  searchProperties,
});
export const messageSearchResults = (messages, query) => ({
  type: MESSAGE_SEARCH_RESULTS,
  messages,
  query,
});
export const messageSearchMore = () => ({
  type: MESSAGE_SEARCH_MORE,
});
export const openUserDetails = (userId, clientX, clientY) => ({
  type: OPEN_USER_DETAILS,
  userId,
  clientX,
  clientY,
});
export const closeUserDetails = () => ({
  type: CLOSE_USER_DETAILS,
});
export const changeChannelInProgress = () => ({
  type: CHANGE_CHANNEL_IN_PROGRESS,
});
export const changeTeamInProgress = () => ({
  type: CHANGE_TEAM_IN_PROGRESS,
});
export const toggleTeamListChannel = () => ({
  type: TOGGLE_TEAM_LIST_CHANNEL,
});
export const checkAuth = () => ({
  type: CHECK_AUTH,
});
export const authStatus = authResponse => ({
  type: AUTH_STATUS,
  authResponse,
});

export const authSuccess = token => ({
  type: AUTH_SUCCESS,
  token,
});

export const authExpired = () => ({
  type: AUTH_EXPIRED,
});

export const loginSend = credentials => ({
  type: LOGIN_SEND,
  credentials,
});
export const userDetailsReceived = user => ({
  type: USER_DETAILS_RECEIVED,
  user,
});

/*
 * Export default
 */
export default reducer;
