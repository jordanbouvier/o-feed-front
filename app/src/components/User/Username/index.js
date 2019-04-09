/*
 * Npm import
 */
import React from 'react';
import PropTypes from 'prop-types';
/*
 * Component
 */
class Username extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  };
  showUserDetails = (evt) => {
    const { id } = this.props;
    const { clientX, clientY } = evt;
    this.props.actions.openUserDetails(id, clientX, clientY);
  };
  render() {
    const { name } = this.props;
    return (
      <span className="username" onClick={this.showUserDetails}>{name}</span>
    );
  }
}
export default Username;
