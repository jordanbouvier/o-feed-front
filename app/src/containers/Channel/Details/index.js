/*
 * Npm import
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


/*
 * Local import
 */
import ChannelDetails from 'src/components/Channel/Details';

/*
 * State
 */
const mapStateToProps = state => ({
  channelDetailsOpen: state.reducer.channelDetailsOpen,
  currentChannel: state.reducer.currentChannel,
});

/*
 * Actions
 */

const dispatchToProps = {};

const ChannelDetailsContainer = connect(mapStateToProps, dispatchToProps)(ChannelDetails);

export default ChannelDetailsContainer;
