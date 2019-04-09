/*
 * Npm import
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/*
 * Local import
 */
import UserCard from 'src/components/User/UserCard';
import { openUserDetails } from 'src/store/reducer';

/*
 * State
 */
const mapStateToProps = state => ({
  user: state.reducer.userCardDetails.user,
  clientX: state.reducer.userCardDetails.clientX,
  clientY: state.reducer.userCardDetails.clientY,
});

/*
 * Actions
 */

const dispatchToProps = dispatch => ({
  actions: bindActionCreators({ openUserDetails }, dispatch),
});

const UserCardContainer = connect(
  mapStateToProps,
  dispatchToProps,
  null,
  { withRef: true },
)(UserCard);

export default UserCardContainer;
