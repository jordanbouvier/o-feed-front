/*
 * Npm import
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


/*
 * Local import
 */
import ChannelInfo from 'src/components/Channel/Info';
import { channelDetailsToggle } from 'src/store/reducer';

/*
 * State
 */
const mapStateToProps = state => ({
  channelDetails: state.reducer.currentChannel,
});

/*
 * Actions
 */

const dispatchToProps = dispatch => ({
  actions: bindActionCreators({ channelDetailsToggle }, dispatch),
});

const ChannelInfoContainer = connect(mapStateToProps, dispatchToProps)(ChannelInfo);

export default ChannelInfoContainer;
