/*
 * Npm import
 */
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
/*
 * Local import
 */
import reducer from 'src/store/reducer';
import websocketReducer from 'src/store/reducers/websocket';
import teamMiddleware from 'src/store/middlewares/team';
import channelMiddleware from 'src/store/middlewares/channel';
import searchMiddleware from 'src/store/middlewares/search';
import authMiddleware from 'src/store/middlewares/auth';
import websocketMiddleware from 'src/store/middlewares/websocket';


/*
 * Store
 */

const devTools = [];
if (window.devToolsExtension) {
  devTools.push(window.devToolsExtension());
}
const teamEnhancer = applyMiddleware(teamMiddleware);
const searchEnhancer = applyMiddleware(searchMiddleware);
const channelEnhancer = applyMiddleware(channelMiddleware);
const authEnhancer = applyMiddleware(authMiddleware);
const websocketEnhancer = applyMiddleware(websocketMiddleware);
const enhancers = compose(
  teamEnhancer,
  channelEnhancer,
  searchEnhancer,
  authEnhancer,
  websocketEnhancer,
  ...devTools,
);
const store = createStore(
  combineReducers({
    reducer,
    websocket: websocketReducer,
  }),
  enhancers,
);


export default store;
