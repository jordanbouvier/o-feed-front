/*
 * Npm import
 */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

/*
 * Local import
 */
import Search from 'src/containers/Search';
import Team from 'src/containers/Team';
import Login from 'src/containers/Login';

/*
 * Component
 */
class Routes extends React.Component {
  requireAuth = (Component, path) => {
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      return Component;
    }
    return <Redirect to="/login" />;
  }
  render() {
    const { isLoggedIn } = this.props;
    return (
      <Switch>
        <Route
          exact
          path="/team/:team_id"
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
    );
  }
}
export default Routes;
