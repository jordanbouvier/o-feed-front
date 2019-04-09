/*
 * Npm import
 */
import React from 'react';

import PropTypes from 'prop-types';
/*
 * Local import
 */
import MessageContainer from 'src/components/MessageContainer';
/*
 * Component
 */

class Search extends React.Component {
  static propTypes = {
    actions: PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
    searchResult: PropTypes.node.isRequired,
    teams: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  };
  state = {
    form: {},
  }
  changeTeam = (evt) => {
    const teamId = evt.target.value;
    this.props.actions.teamChannelsGet(teamId);
    this.changeInput(evt);
  }
  handleSubmit = (evt) => {
    evt.preventDefault();
    const { form } = this.state;
    this.props.actions.messageSearch(form);
  }
  changeInput = (evt) => {
    const { value } = evt.target;
    const { name } = evt.target;
    const { form } = this.state;
    this.setState({
      form: {
        ...form,
        [name]: value,
      },
    });
  }
  loadMoreMessages = () => {
    const { searchResult } = this.props;
    const hasMore = searchResult.page + 1 <= searchResult.total_page;
    if (hasMore) {
      this.props.actions.messageSearchMore();
    }
  };
  render() {
    const { teams, currentTeam, searchResult } = this.props;
    return (
      <div id="search">
        <form className="search-form" onSubmit={this.handleSubmit}>
          <input type="text" className="search-main-input" name="c" placeholder="Contenu" onChange={this.changeInput} />
          <select name="t" onChange={this.changeTeam}>
            <option value="all">All</option>
            {
              teams.map(team => (
                <option key={team.id_slack} value={team.id_slack}>{team.name}</option>

              ))
            }
          </select>
          { currentTeam &&
            <select name="ch" onChange={this.changeInput}>
              <option value="all">All</option>
              {
                currentTeam.channels.map(channel => (
                  <option key={channel.id_slack} value={channel.id_slack}>{channel.name}</option>
                ))
              }
            </select>
          }
          <input type="date" name="d" onChange={this.changeInput} />
          <button type="submit">Rechercher</button>
        </form>
        {searchResult &&
          <MessageContainer messages={searchResult.messages} loadMore={this.loadMoreMessages} />
        }
      </div>
    );
  }
}
export default Search;
