/*
 * Npm import
 */
import React from 'react';
import PropTypes from 'prop-types';
import FaUser from 'react-icons/lib/fa/user';
import FaPin from 'react-icons/lib/fa/thumb-tack';
import FaDots from 'react-icons/lib/fa/ellipsis-v';

class ChannelInfo extends React.Component {
  toggleChannelDetails = () => {
    this.props.actions.channelDetailsToggle();
  };
  render() {
    const { channelDetails } = this.props;
    if (!channelDetails) {
      return <div>Loading</div>;
    }
    let pinnedItemCount = 0;
    if (channelDetails.pinned_items) {
      const pinnedFiles = channelDetails.pinned_items.files;
      const pinnedMessages = channelDetails.pinned_items.messages;
      const pinnedFilesLength = pinnedFiles ? pinnedFiles.length : 0;
      const pinnedMessagesLength = pinnedMessages ? pinnedMessages.length : 0;
      pinnedItemCount = pinnedFilesLength + pinnedMessagesLength;
    }
    return (
      <div className="channel-info">
        <div className="channel-info-name">{channelDetails.channel.name}</div>
        <div className="channel-info-counter">
          <FaUser />
          <span>{channelDetails.channel.users.length}</span>
        </div>
        <div className="channel-info-counter">
          <FaPin />
          <span>
            {pinnedItemCount}
          </span>
        </div>
        <div className="channel-info-actions">
          <div>
            <FaDots onClick={this.toggleChannelDetails} />
          </div>
        </div>
      </div>
    );
  }
}
ChannelInfo.propTypes = {
  channelDetails: PropTypes.object,
  actions: PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
};
ChannelInfo.defaultProps = {
  channelDetails: {
    channel: {
      name: '',
      users: [],
      pinned_items: {
        files: [],
        messages: [],
      },
    },
  },
};
export default ChannelInfo;
