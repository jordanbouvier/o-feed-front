/*
 * Npm import
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


/*
 * Local import
 */
import Search from 'src/components/Search';
import { teamChannelsGet, messageSearch, messageSearchMore } from 'src/store/reducer';

/*
 * State
 */
const mapStateToProps = state => ({
  teams: state.reducer.teams,
  currentTeam: state.reducer.currentTeam,
  searchResult: state.reducer.searchResult,
});

/*
 * Actions
 */

const dispatchToProps = dispatch => ({
  actions: bindActionCreators({ teamChannelsGet, messageSearch, messageSearchMore }, dispatch),
});

const SearchContainer = connect(mapStateToProps, dispatchToProps)(Search);

export default SearchContainer;
