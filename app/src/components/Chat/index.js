/*
 * Npm import
 */
import React from 'react';
/*
 * Local import
 */
import MessageFormat from 'src/components/Message/MessageFormat';
/*
 * Component
 */
class Chat extends React.Component {
  state = {
    message: '',
  }
  handleKeyPress = (evt) => {
    if (evt.which === 13 && !evt.shiftKey) {
      evt.preventDefault();
      const { message } = this.state;
      this.props.actions.sendMessage(message);
      this.setState({ message: '' });
    }
  }

  handleInputChange = (evt) => {
    this.setState({ message: evt.target.value});
  }
  handleSubmit = (evt) => {
    evt.preventDefault();
    const { message } = this.state;
    this.props.actions.sendMessage(message);
    this.setState({ message: '' });
  }
  render() {
    const { messages } = this.props;
    const messageInput = this.state.message;
    return (
      <div className="chat">
        <div className="chat-title">Salle de discussion</div>
        <div className="chat-messages">
          {
            messages.map(message => (
              <div className="chat-message">
                <div className="chat-message-author">{message.author_name}</div>
                <div className="chat-message-content">
                  <MessageFormat message={message.content} />
                </div>
              </div>
            ))
          }
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="chat-input">
            <textarea
              onKeyPress={this.handleKeyPress}
              onChange={this.handleInputChange}
              placeholder="Your message"
              value={messageInput}
            />
          </div>
        </form>
      </div>
    );
  }
}
/*
 * Export default
 */
export default Chat;
