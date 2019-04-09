/*
 * Npm import
 */
import React from 'react';
import PropTypes from 'prop-types';
/*
 * Component
 */
class UserCard extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      display_name: PropTypes.string,
      real_name: PropTypes.string,
    }).isRequired,
  }
  getUsername = () => {
    const { user } = this.props;
    if (user.display_name) {
      return user.display_name;
    }
    if (user.real_name) {
      return user.real_name;
    }
    return 'Username';
  }
  correctPosition = () => {
    if (!this.userCard) {
      return;
    }
    const { clientY, clientX } = this.props;
    const elementHeight = this.userCard.scrollHeight;
    const windowHeight = window.innerHeight;
    if (clientY + elementHeight > windowHeight ) {
      const newPosition = windowHeight - elementHeight;
      this.userCard.style.top = `${newPosition}px`;
    }
  }
  render() {
    const { user, clientY, clientX } = this.props;
    let username = user.real_name ? user.real_name : user.display_name;
    username = username ? username : 'Username';
    return (
      <div
        className="user-card"
        style={{ left: clientX, top: clientY }}
        ref={node => (this.userCard = node)}
      >
        <div className="user-card-picture">
          <img
            src={user.big_picture}
            onLoad={this.correctPosition}
            alt={username}
          />
        </div>
        <div className="user-card-content">
          <div className="user-card-name">{username}</div>
          <div className="user-card-email">{user.email}</div>
        </div>
      </div>
    );
  }
}
export default UserCard;
