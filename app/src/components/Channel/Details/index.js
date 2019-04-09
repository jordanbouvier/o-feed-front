/*
 * Npm import
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FaInformation from 'react-icons/lib/fa/info-circle';
import FaPin from 'react-icons/lib/fa/thumb-tack';
import FaUser from 'react-icons/lib/fa/user';
import FaFile from 'react-icons/lib/fa/file';

/*
 * Local import
 */
import ChannelDetailItem from 'src/components/Channel/Details/DetailItem';
import UserSmall from 'src/components/UserSmall';
import Message from 'src/components/Message';
import MessageFormat from 'src/components/Message/MessageFormat';
import { getUsername } from 'src/utils/userUtils';
/*
 * Component
 */
const ChannelDetails = ({ channelDetailsOpen, currentChannel }) => {
  if (!currentChannel) {
    return <div>Loading</div>;
  }
  const classList = classNames({
    'channel-details': true,
    'channel-details--visible': channelDetailsOpen,
    'channel-details--hidden': !channelDetailsOpen,
  });
  const pinnedItems = [...currentChannel.pinned_items.messages, ...currentChannel.pinned_items.files];
  return (
    <div className={classList}>
      <ChannelDetailItem
        name="Channel details"
        icon={
          <FaInformation color="grey" />
        }
      >
        <p>Purpose</p>
        <MessageFormat message={currentChannel.channel.purpose} />
        <p>Created by {currentChannel.channel.creator.display_name} on June 12, 2017</p>
      </ChannelDetailItem>
      <ChannelDetailItem
        name="Pinned messages"
        icon={
          <FaPin color="red" />
        }
      >
        <div className="pinned-items">
          {
            currentChannel.pinned_items.messages.map(pinnedMessage => (
              <Message key={pinnedMessage.ts} message={pinnedMessage} />
            ))
          }
        </div>
      </ChannelDetailItem>
      <ChannelDetailItem
        name="Members"
        icon={
          <FaUser color="green" />
        }
      >
        {
          currentChannel.channel.users.map(user => (
            <UserSmall
              key={user.id_slack}
              name={getUsername(user)}
              picture={user.picture}
              id={user.id_slack}
            />
          ))
        }
      </ChannelDetailItem>
      <ChannelDetailItem
        name="Shared files"
        icon={
          <FaFile color="orange" />
        }
      >
        yyyy
      </ChannelDetailItem>
    </div>
  );
};
ChannelDetails.propTypes = {
  channelDetailsOpen: PropTypes.bool,
};
ChannelDetails.defaultProps = {
  channelDetailsOpen: false,
};
export default ChannelDetails;
