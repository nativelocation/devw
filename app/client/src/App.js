import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import configureStore from './redux';
import Auth from './config/auth';

import Login from './routes/Login';
import Home from './routes/Home';
import NotFound from './routes/NotFound';

import Edit from './routes/Edit';
import Client from './routes/Client';

import Users from './routes/Users/List';
import RegisterUser from './routes/Users/Register';
import User from './routes/Users/Info';

import Teams from './routes/Teams/List';
import RegisterTeam from './routes/Teams/Register';
import Team from './routes/Teams/Info';

import Contracts from './routes/Contracts/List';
import NewContract from './routes/Contracts/New';
import EditContract from './routes/Contracts/Edit';
import Contract from './routes/Contracts/Info';

const store = configureStore();
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Fragment>
            <Switch>
              <Route exact path="/login" component={e => Auth.validate(Login, e, store)} />

              <Route exact path="/" component={e => Auth.authorize(Home, e, store)} />
              <Route exact path="/edit" component={e => Auth.authorize(Edit, e, store)} />
              <Route exact path="/client" component={e => Auth.authorize(Client, e, store)} />

              <Route exact path="/profile" component={e => Auth.authorize(User, e, store)} />
              <Route exact path="/profile/edit" component={e => Auth.authorize(RegisterUser, e, store)} />

              <Route exact path="/user/new" component={e => Auth.authorize(RegisterUser, e, store, 1)} />
              <Route exact path="/user/edit/:id" component={e => Auth.authorize(RegisterUser, e, store, 1)} />
              <Route exact path="/user/:id" component={e => Auth.authorize(User, e, store, 1)} />
              <Route exact path="/user" component={e => Auth.authorize(Users, e, store, 1)} />

              <Route exact path="/team/new" component={e => Auth.authorize(RegisterTeam, e, store, 1)} />
              <Route exact path="/team/edit/:id" component={e => Auth.authorize(RegisterTeam, e, store, 1)} />
              <Route exact path="/team/:id" component={e => Auth.authorize(Team, e, store, 1)} />
              <Route exact path="/team" component={e => Auth.authorize(Teams, e, store, 1)} />

              <Route exact path="/contract/new" component={e => Auth.authorize(NewContract, e, store)} />
              <Route exact path="/contract/edit/:id" component={e => Auth.authorize(EditContract, e, store)} />
              <Route exact path="/contract/:id" component={e => Auth.authorize(Contract, e, store)} />
              <Route exact path="/contract" component={e => Auth.authorize(Contracts, e, store)} />
              <Route component={NotFound} />
            </Switch>
          </Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;