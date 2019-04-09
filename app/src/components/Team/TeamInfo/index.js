/*
 * Npm import
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FaRightArrow from 'react-icons/lib/fa/chevron-circle-right';
import classNames from 'classnames';

class TeamInfo extends React.Component {
  toggleTeamPanel = () => {
    this.props.actions.toggleTeamListChannel();
  }
  render() {
    const { currentTeam, closeTeamListChannel } = this.props;
    if (!currentTeam) {
      return <div>Loading</div>;
    }
    const classes = classNames({
      'team-info--close': closeTeamListChannel,
      'team-info--open': !closeTeamListChannel,
    });
    return (
      <div id="team-info" className={classes}>
        <div id="toggle-team" onClick={this.toggleTeamPanel}><FaRightArrow /></div>
        <div className="team-info-name">{currentTeam.name}</div>
        <div id="team-info-channel-list">
          {currentTeam.channels.map(channel => (
            <div className="channel-name" key={channel.id_slack}>
              <Link to={`/team/${currentTeam.id_slack}/${channel.id_slack}`}>
                # {channel.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
TeamInfo.propTypes = {
  currentTeam: PropTypes.object.isRequired,
};

export default TeamInfo;
