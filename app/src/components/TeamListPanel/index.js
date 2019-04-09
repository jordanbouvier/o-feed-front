/*
 * Npm import
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import FaSearch from 'react-icons/lib/fa/search';

class TeamListPanel extends React.Component {
  componentDidMount() {
    this.props.actions.teamsGet();
  }
  render() {
    const { teams, closeTeamListChannel } = this.props;
    if (!teams) {
      return <div></div>;
    }
    const classes = classNames({
      'team-list-panel--close': closeTeamListChannel,
      'team-list-panel--open': !closeTeamListChannel,
    });
    return (
      <div id="team-list-panel" className={classes}>
        <div id="team-list">
          { teams.map(team => (
            <Link
              key={team.name}
              to={`/team/${team.id_slack}`}
            >
              <img
                src={team.icon}
                className="team-icon"
                alt="icone"
              />
            </Link>
          ))}
          <Link
            id="search-link"
            to="/search"
          >
            <FaSearch />
          </Link>
        </div>
      </div>
    );
  }
}
TeamListPanel.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
export default TeamListPanel;
