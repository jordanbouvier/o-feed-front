/*
 * Npm import
 */
import React from 'react';
import PropTypes from 'prop-types';

/*
 * Local import
 */
import ChannelInfo from 'src/containers/Channel/Info';
import ChannelDetails from 'src/containers/Channel/Details';
import MessageContainer from 'src/components/MessageContainer';
import LoadingScreen from 'src/components/LoadingScreen';

class Channel extends React.Component {
  componentDidMount = () => {
    this.getMessages();
  }
  componentDidUpdate = (prevProps) => {
    const { channelId } = this.props;
    if (channelId && prevProps.channelId) {
      if (channelId !== prevProps.channelId) {
        this.getMessages();
      }
    }
    else if (channelId && !prevProps.channelId) {
      this.getMessages();
    }
  }
  getMessages = () => {
    const { channelId } = this.props;
    if (channelId) {
      this.props.actions.channelMessagesGet(channelId);
    }
  }
  loadMoreMessages = () => {
    const { channelDetails } = this.props;
    const channelId = channelDetails.channel.id_slack;
    const hasMore = channelDetails.has_more;
    if (hasMore) {
      this.props.actions.channelMessageGetMore(channelId);
    }
  };
  render() {
    const { channelDetails, changeChannelInProgress } = this.props;
    if (changeChannelInProgress) {
      return <LoadingScreen />;
    }
    if (!channelDetails) {
      return <div></div>;
    }
    return (
      <div className="channel">
        <ChannelInfo />
        <div className="channel-content">
          <MessageContainer
            messages={channelDetails.messages}
            hasMore={channelDetails.has_more}
            currentPage={channelDetails.current_page}
            loadMore={this.loadMoreMessages}
          />
          <ChannelDetails />
        </div>
      </div>
    );
  }
}
Channel.propTypes = {
  channelDetails: PropTypes.shape({
    has_more: PropTypes.bool,
    current_page: PropTypes.number,
  }),
  actions: PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
  channelId: PropTypes.string.isRequired,
};
Channel.defaultProps = {
  channelDetails: null,
};
export default Channel;
