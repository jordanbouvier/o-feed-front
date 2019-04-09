/*
 * Npm import
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
/*
 * Component
 */
class ChannelDetailsItem extends React.Component {
  state = {
    isOpen: 'init',
  };
  togglePannel = () => {
    const { isOpen } = this.state;
    if (isOpen === 'init') {
      this.setState({ isOpen: true });
    }
    else {
      this.setState({ isOpen: !isOpen });
    }
  };
  render() {
    const { name, children, icon } = this.props;
    const { isOpen } = this.state;
    const contentClass = classNames({
      'channel-details-item-content': true,
      'channel-details-item--open': (isOpen && isOpen !== 'init'),
      'channel-details-item--close': (!isOpen && isOpen !== 'init'),
    });

    return (
      <div className="channel-details-item">
        <div className="channel-details-item-name" onClick={this.togglePannel}>
          <span className="channel-details-item-name-icon">{icon}</span>
          <span className="channel-details-item-name-username">{name}</span>
        </div>
        <div className={contentClass}>
          {children}
        </div>
      </div>
    );
  }
}
ChannelDetailsItem.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};
export default ChannelDetailsItem;
