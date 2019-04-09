/*
 * Npm import
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


/*
 * Local import
 */
import Chat from 'src/components/Chat';
import { sendMessage } from 'src/store/reducers/websocket';

/*
 * State
 */
const mapStateToProps = state => ({
  messages: state.websocket.chatMessages,
});

/*
 * Actions
 */

const dispatchToProps = dispatch => ({
  actions: bindActionCreators({ sendMessage }, dispatch),
});

const ChatContainer = connect(mapStateToProps, dispatchToProps)(Chat);

export default ChatContainer;
