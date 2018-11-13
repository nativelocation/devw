import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import configureStore from './redux';
import Auth from './config/auth';

import Home from './routes/Home';
import Edit from './routes/Edit';
import Client from './routes/Client';
import Users from './routes/Users';
import Teams from './routes/Teams';
import Contracts from './routes/Contracts';
import Login from './routes/Login';


const store = configureStore();
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Fragment>
            <Switch>
              <Route exact path="/" component={e => Auth.authorize(Home, e, store, "Dashboard")} />
              <Route exact path="/edit" component={e => Auth.authorize(Edit, e, store, "Edit User")} />
              <Route exact path="/client" component={e => Auth.authorize(Client, e, store, "Dashboard")} />
              <Route exact path="/users" component={e => Auth.authorize(Users, e, store, "Users")} />
              <Route exact path="/teams" component={e => Auth.authorize(Teams, e, store, "Teams")} />
              <Route exact path="/contracts" component={e => Auth.authorize(Contracts, e, store, "Contracts")} />

              <Route exact path="/login" component={e => Auth.validate(Login, e, store)} />
            </Switch>
          </Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;