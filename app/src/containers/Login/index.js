/*
 * Npm import
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';


/*
 * Local import
 */
import Login from 'src/components/Login';
import { loginSend } from 'src/store/reducer';
/*
 * State
 */
const mapStateToProps = state => ({
  isLoggedIn: state.reducer.isLoggedIn,
});

/*
 * Actions
 */

const dispatchToProps = dispatch => ({
  actions: bindActionCreators({ loginSend }, dispatch),
});

const LoginContainer = connect(mapStateToProps, dispatchToProps)(Login);

export default withRouter(LoginContainer);
