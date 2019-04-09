/*
 * Npm import
 */
import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';

/*
 * Local import
 */
import MessageFormat from 'src/containers/Message/MessageFormat';
import Reactions from 'src/components/Reactions';
import Replies from 'src/components/Replies';
import Username from 'src/containers/User/Username';
import { getFormatedDate } from 'src/utils/dateList';
import { getUsername } from 'src/utils/userUtils';

const Message = ({ message, isReply }) => {
  const defaultPicture = 'http://192.168.1.33/o-feed-jordan/web/uploads/default-avatar.png';
  let picture = './img/default-avatar.png';
  const user = isReply ? message.author : message.user_slack;
  if (user) {
    picture = user.picture;
  }
  const date = new Date(message.ts * 1000);
  const formatedDate = getFormatedDate(date);
  let repliesCount = 0;
  if (!isReply) {
    repliesCount = message.replies.length;
  }
  return (
    <div className="message">
      <div className="message-author-thumbnail">
        <LazyLoad height={40} once offset={[80, 80]} overflow>
          <img
            src={picture}
            alt="icon utilisateur"
            onError={(evt) => {
              evt.target.src = defaultPicture;
            }}
          />
        </LazyLoad>
      </div>
      <div className="message-container">
        <div className="message-author">
          {user &&
            <Username
              name={getUsername(user)}
              id={user.id_slack}
            />
          }
          <span className="message-date"> {formatedDate}</span>
        </div>

        <MessageFormat message={message.content} />
        <Reactions reactions={message.reactions} />
        {!isReply && repliesCount > 0 && <Replies replies={message.replies} />}
      </div>
    </div>
  );
};
Message.propTypes = {
  message: PropTypes.shape({
    content: PropTypes.string,
    created_at: PropTypes.string,
    id: PropTypes.number,
    user_slack: PropTypes.shape({
      real_name: PropTypes.string,
      display_name: PropTypes.string,
    }),
    replies: PropTypes.array,
  }),
  isReply: PropTypes.bool,
};
Message.defaultProps = {
  message: {
    content: '',
    created_at: '',
    id: '',
    user_slack: {
      real_name: 'Anonymous',
      display_name: 'Anonymous',
    },
    reactions: [],
    replies: [],
  },
  isReply: false,
};

export default Message;
