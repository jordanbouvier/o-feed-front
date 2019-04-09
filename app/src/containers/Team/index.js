/*
 * Npm import
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';


/*
 * Local import
 */
import Team from 'src/components/Team';
import { teamChannelsGet, channelMessagesGet, toggleTeamListChannel } from 'src/store/reducer';

/*
 * State
 */
const mapStateToProps = state => ({
  teams: state.reducer.teams,
  currentTeam: state.reducer.currentTeam,
  teamListLoaded: state.reducer.teamListLoaded,
  changeTeamInProgress: state.reducer.changeTeamInProgress,
});

/*
 * Actions
 */

const dispatchToProps = dispatch => ({
  actions: bindActionCreators({ teamChannelsGet, channelMessagesGet, toggleTeamListChannel }, dispatch),
});

const TeamContainer = connect(mapStateToProps, dispatchToProps)(Team);

export default withRouter(TeamContainer);
