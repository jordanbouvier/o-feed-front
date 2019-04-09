/*
 * Npm import
*/
import axios from 'axios';
/*
 * Local import
 */
import { MESSAGE_SEARCH, MESSAGE_SEARCH_MORE, messageSearchResults } from 'src/store/reducer';
import { SEARCH_ENDPOINT } from 'src/utils/endpoints';

const createMiddleware = store => next => (action) => {
  next(action);
  switch (action.type) {
    case MESSAGE_SEARCH: {
      const { searchProperties } = action;
      if (!searchProperties) {
        break;
      }
      const queryArray = [];
      if (searchProperties.c && searchProperties.c.length > 0) {
        queryArray.push(`c=${searchProperties.c}`);
      }
      if (searchProperties.ch && searchProperties.ch.length > 0 && searchProperties.ch !== 'all') {
        queryArray.push(`ch=${searchProperties.ch}`);
      }
      if (searchProperties.t && searchProperties.t.length > 0 && searchProperties.t !== 'all') {
        queryArray.push(`t=${searchProperties.t}`);
      }
      if (searchProperties.d && searchProperties.d.length > 0) {
        queryArray.push(`d=${searchProperties.d}`);
      }
      if (queryArray.length > 0) {
        let queryString = '?';
        queryArray.forEach((queryParam, queryIndex) => {
          queryString += queryParam;
          if (queryIndex < queryArray.length - 1) {
            queryString += '&';
          }
        });
        const url = `${SEARCH_ENDPOINT}${queryString}`;
        axios({
          method: 'GET',
          url,
        })
          .then((response) => {
            store.dispatch(messageSearchResults(response.data, queryString));
          });
      }
      break;
    }
    case MESSAGE_SEARCH_MORE: {
      const { searchResult } = store.getState();
      if (!searchResult || searchResult.page + 1 > searchResult.total_page) {
        break;
      }
      const page = searchResult.page + 1;
      const url = `${SEARCH_ENDPOINT}${searchResult.searchQuery}&page=${page}`;
      axios({
        url,
        method: 'GET',
      })
        .then((response) => {
          const newSearchResults = {
            ...searchResult,
            ...response.data,
            messages: [
              ...response.data.messages,
              ...searchResult.messages,
            ],
          };
          store.dispatch(messageSearchResults(newSearchResults, searchResult.searchQuery));
        });
      break;
    }
    default:
  }
};

export default createMiddleware;
