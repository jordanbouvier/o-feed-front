/*
 * Npm import
 */
import { connect } from 'react-redux';


/*
 * Local import
 */
import MessageFormat from 'src/components/Message/MessageFormat';
// import { teamChannelsGet, channelMessagesGet } from 'src/store/reducer';

/*
 * State
 */
const mapStateToProps = state => ({
  users: state.reducer.userList,
});

/*
 * Actions
 */

const dispatchToProps = {};

const MessageFormatContainer = connect(mapStateToProps, dispatchToProps)(MessageFormat);

export default MessageFormatContainer;
