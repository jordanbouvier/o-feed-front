/*
 * Npm import
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


/*
 * Local import
 */
import Channel from 'src/components/Channel';
import { channelMessageGetMore, channelMessagesGet } from 'src/store/reducer';

/*
 * State
 */
const mapStateToProps = state => ({
  channelDetails: state.reducer.currentChannel,
  changeChannelInProgress: state.reducer.changeChannelInProgress,
});

/*
 * Actions
 */

const dispatchToProps = dispatch => ({
  actions: bindActionCreators({ channelMessageGetMore, channelMessagesGet }, dispatch),
});

const ChannelContainer = connect(mapStateToProps, dispatchToProps)(Channel);

export default ChannelContainer;
