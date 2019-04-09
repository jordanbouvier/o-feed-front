/*
 * Npm import
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


/*
 * Local import
 */
import TeamInfo from 'src/components/Team/TeamInfo';
import { toggleTeamListChannel } from 'src/store/reducer';

/*
 * State
 */
const mapStateToProps = state => ({
  currentTeam: state.reducer.currentTeam,
  closeTeamListChannel: state.reducer.closeTeamListChannel,
});

/*
 * Actions
 */
const dispatchToProps = dispatch => ({
  actions: bindActionCreators({ toggleTeamListChannel }, dispatch),
});

const TeamInfoContainer = connect(mapStateToProps, dispatchToProps)(TeamInfo);

export default TeamInfoContainer;
