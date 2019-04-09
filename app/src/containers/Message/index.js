/*
 * Npm import
 */
import { connect } from 'react-redux';


/*
 * Local import
 */
import Message from 'src/components/Message';
// import { teamChannelsGet, channelMessagesGet } from 'src/store/reducer';

/*
 * State
 */
const mapStateToProps = state => ({
  users: state.reducer.currentChannel.users,
});

/*
 * Actions
 */

const dispatchToProps = {};

const MessageContainer = connect(mapStateToProps, dispatchToProps)(Message);

export default MessageContainer;
