/*
 * Npm import
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/*
 * Local import
 */
import Username from 'src/components/User/Username';
import { openUserDetails } from 'src/store/reducer';

/*
 * State
 */
const mapStateToProps = () => ({});

/*
 * Actions
 */

const dispatchToProps = dispatch => ({
  actions: bindActionCreators({ openUserDetails }, dispatch),
});

const UsernameContainer = connect(mapStateToProps, dispatchToProps)(Username);

export default UsernameContainer;
