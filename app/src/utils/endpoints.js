const baseUrl = 'http://192.168.1.33/o-feed-jordan/web/app_dev.php/api';

export const TEAM_ENDPOINT = `${baseUrl}/team/`;
export const teamChannelsEndpoint = teamId => `${baseUrl}/team/${teamId}/channels`;

export const CHANNEL_ENDPOINT = `${baseUrl}/channel`;
export const channelDetailsWithMessage = id => `${CHANNEL_ENDPOINT}/${id}`;
export const SEARCH_ENDPOINT = `${baseUrl}/message/search`;
export const USER_DATA = `${baseUrl}/me`;
export const JSON_LOGIN = `${baseUrl}/login_check`;
export const WS_URL = '127.0.0.1:8080';
