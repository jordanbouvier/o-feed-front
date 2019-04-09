/*
 * Npm import
 */
import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import ReactPlaceholder from 'react-placeholder';

/*
 * Local import
 */
import Message from 'src/components/Message';

/*
 * Component
 */
class MessageContainer extends React.Component {
  componentDidMount() {
    this.changeScrollPosition();
  }
  componentDidUpdate() {
    this.changeScrollPosition();
  }
  changeScrollPosition = () => {
    if (this.messageContainer) {
      const messagesContainer = this.messageContainer;
      const messagesDom = messagesContainer.children;
      if (messagesDom[49]) {
        const messageTop = messagesDom[49].offsetTop;
        messagesContainer.scrollTop = messageTop;
      }
    }
  }
  handleScroll = (evt) => {
    const scrollPosition = evt.target.scrollTop;
    if (scrollPosition === 0) {
      const { loadMore } = this.props;
      loadMore();
    }
  }
  render() {
    const { messages } = this.props;
    return (
      <div
        className="channel-messages"
        onScroll={this.handleScroll}
        ref={(node) => {
          this.messageContainer = node;
        }}
      >
        {
          messages.map(message => (
            <Message
              message={message}
              key={message.id}
            />
          ))
        }
      </div>
    );
  }
}
MessageContainer.propTypes = {
  messages: PropTypes.array.isRequired,
  loadMore: PropTypes.func.isRequired,
};
export default MessageContainer;
