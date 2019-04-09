/*
 * Npm import
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';


/*
 * Local import
 */
import App from 'src/components/App';
import { teamsGet, closeUserDetails, checkAuth } from 'src/store/reducer';
import { websocketConnect } from 'src/store/reducers/websocket';
/*
 * State
 */
const mapStateToProps = state => ({
  userDetailsOpened: state.reducer.userDetailsOpened,
  isLoggedIn: state.reducer.isLoggedIn,
});

/*
 * Actions
 */

const dispatchToProps = dispatch => ({
  actions: bindActionCreators({
    teamsGet,
    closeUserDetails,
    checkAuth,
    websocketConnect,
  }, dispatch),
});

const AppContainer = connect(mapStateToProps, dispatchToProps)(App);

export default withRouter(AppContainer);
