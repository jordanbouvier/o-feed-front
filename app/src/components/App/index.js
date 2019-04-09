/*
 * Npm import
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';


/*
 * Local import
 */
import TeamListPanel from 'src/containers/TeamListPanel';
import UserCard from 'src/containers/User/UserCard';
import LoadingScreen from 'src/components/LoadingScreen';
import Routes from 'src/components/Routes';
import Chat from 'src/containers/Chat';
import Search from 'src/containers/Search';
import Team from 'src/containers/Team';
import Login from 'src/containers/Login';

class App extends React.Component {
  componentDidMount() {
    this.props.actions.checkAuth();
    // this.props.actions.websocketConnect();
  }
  requireAuth = (Component, path) => {
    const { isLoggedIn } = this.props;
    if (!isLoggedIn) {
      console.log(isLoggedIn);
      return <Redirect to="/signin" />;
    }
    return Component;
  }
  handleMouseDown = (event) => {
    if (this.userCard) {
      const userCard = this.userCard.getWrappedInstance();
      if (!userCard.userCard.contains(event.target)) {
        this.props.actions.closeUserDetails();
      }
    }
  }

  render() {
    const { userDetailsOpened, isLoggedIn } = this.props;
    return (
      <div id="app" onMouseDown={this.handleMouseDown}>
        { isLoggedIn && <TeamListPanel />}
        {/*<Routes isLoggedIn={isLoggedIn} />*/}
        <Switch>
          <Route
            exact
            path="/team/:team_id/"
            render={() => (
              this.requireAuth(<Team />)
            )}
          />
          <Route
            exact
            path="/team/:team_id/:channel_id"
            render={() => (
              this.requireAuth(<Team />)
            )}
          />
          <Route
            exact
            path="/search"
            render={() => (
              this.requireAuth(<Search />)
            )}
          />
          <Route
            path="/signin"
            render={() => (
              <Login isLoggedIn={isLoggedIn} />
            )}
          />
        </Switch>
        {
          /*
          <Chat />
          */
        }
        {userDetailsOpened &&
        <UserCard ref={(node) => {
          this.userCard = node;
        }}
        />
        }
      </div>
    );
  }
}
App.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
  userDetailsOpened: PropTypes.bool.isRequired,
};
export default App;
