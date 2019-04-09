/*
 * Npm import
 */
import React from 'react';
import PropTypes from 'prop-types';
/*
 * Local import
 */
import TeamInfo from 'src/containers/Team/TeamInfo';
import Channel from 'src/containers/Channel';
import LoadingScreen from 'src/components/LoadingScreen';

class Team extends React.Component {
  static propTypes = {
    actions: PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        team_id: PropTypes.string.isRequired,
        channel_id: PropTypes.node,
      }),
    }),
    changeTeamInProgress: PropTypes.bool.isRequired,
  };
  static defaultProps = {
    match: {
      params: {
        channel_id: null,
      },
    },
  };
  componentDidMount() {
    this.getTeam();
  }
  componentDidUpdate() {
    const { currentTeam, teamListLoaded } = this.props;
    const newTeamId = this.props.match.params.team_id;
    if (currentTeam && teamListLoaded) {
      if (newTeamId !== currentTeam.id_slack) {
        this.getTeam();
      }
    }
    else if (teamListLoaded) {
      this.getTeam();
    }
  }
  getTeam = () => {
    const teamId = this.props.match.params.team_id;
    if (teamId) {
      this.props.actions.teamChannelsGet(teamId);
    }
  }
  render() {
    const channelId = this.props.match.params.channel_id;
    const { currentTeam, changeTeamInProgress } = this.props;
    if (!currentTeam || changeTeamInProgress) {
      return <LoadingScreen />;
    }
    return (
      <div id="team">
        <TeamInfo />
        <Channel channelId={channelId} />
      </div>
    );
  }
}
export default Team;
