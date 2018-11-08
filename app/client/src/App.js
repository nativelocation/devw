import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Auth from './config/auth';

import Home from './routes/Home';
import Login from './routes/Login';

import { Provider } from 'react-redux';
import configureStore from './redux';

const store = configureStore();
class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Fragment>
            <Switch>
              <Route exact path="/" component={e => Auth.authorize(Home, e, store)} />
              <Route exact path="/login" component={e => Auth.validate(Login, e, store)} />
            </Switch>
          </Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;