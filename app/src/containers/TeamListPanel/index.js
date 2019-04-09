/*
 * Npm import
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';


/*
 * Local import
 */
import TeamListPanel from 'src/components/TeamListPanel';
import { teamsGet } from 'src/store/reducer';

/*
 * State
 */
const mapStateToProps = state => ({
  teams: state.reducer.teams,
  closeTeamListChannel: state.reducer.closeTeamListChannel,
});

/*
 * Actions
 */

const dispatchToProps = dispatch => ({
  actions: bindActionCreators({ teamsGet }, dispatch),
});

const TeamListPanelContainer = connect(mapStateToProps, dispatchToProps)(TeamListPanel);

export default TeamListPanelContainer;
