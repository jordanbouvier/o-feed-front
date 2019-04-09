/*
 * Npm import
 */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';


/*
 * Local import
 */
import App from 'src/containers/App';
import store from 'src/store';


/*
 * Code
 */
document.addEventListener('DOMContentLoaded', () => {
  const rootComponent = (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
  render(rootComponent, document.getElementById('root'));
});
