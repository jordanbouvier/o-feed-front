/*
 * Npm import
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
/*
 * Local import
 */
import Message from 'src/components/Message';
import RepliesCounter from 'src/components/Replies/RepliesCounter';
/*
 * Component
 */
class Replies extends React.Component {
  state = {
    repliesOpened: 'init',
  }
  toggleReplies = () => {
    const { repliesOpened } = this.state;
    if (repliesOpened === 'init') {
      this.setState({ repliesOpened: true });
    }
    else {
      this.setState({ repliesOpened: !repliesOpened });
    }
  }
  render() {
    const { replies } = this.props;
    const { repliesOpened } = this.state;
    const repliesContentClasses = classNames({
      'message-replies-content': true,
      'message-replies--open': repliesOpened === true,
      'message-replies--close': repliesOpened !== 'init' && !repliesOpened,
    });
    return (
      <div className="message-replies">
        <RepliesCounter repliesCount={replies.length} onClick={this.toggleReplies} />
        <div className={repliesContentClasses}>
          {replies.map(reply => (
            <Message key={reply.ts} message={reply} isReply />
          ))}
        </div>
      </div>
    );
  }
}
Replies.propTypes = {
  replies: PropTypes.array.isRequired,
};
export default Replies;
