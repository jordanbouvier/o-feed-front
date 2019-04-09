/*
 * Npm import
 */
import React from 'react';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router-dom';
/*
 * Local import
 */


/*
 * Component
 */
class Login extends React.Component {
  state = {
    username: '',
    password: '',
  }
  handleSubmit = (evt) => {
    evt.preventDefault();
    const { username, password } = this.state;
    this.props.actions.loginSend({ username, password });
  };
  handleInputChange = (evt) => {
    const inputName = evt.target.name;
    const inputValue = evt.target.value;
    this.setState(() => ({ [inputName]: inputValue }));
  }
  render() {
    const { isLoggedIn } = this.props;
    const { username, password } = this.state;
    if (isLoggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <form id="login-form" onSubmit={this.handleSubmit}>
        <label className="default-label" htmlFor="_username">Username
          <input
            className="default-input"
            type="text"
            name="username"
            value={username}
            onChange={this.handleInputChange}
          />
        </label>
        <label className="default-label" htmlFor="_password">Password</label>
        <input
          className="default-input"
          type="password"
          name="password"
          value={password}
          onChange={this.handleInputChange}
        />
        <button className="default-button" type="submit">Login</button>
      </form>
    );
  }
}
Login.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};
export default Login;
