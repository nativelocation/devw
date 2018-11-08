import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { setAccount } from './redux/actions/account';


import Api from './config/api';
import Home from './routes/Home';
import Login from './routes/Login';

import { Provider } from 'react-redux';
import configureStore from './redux';

const store = configureStore();
class App extends Component {

  storeUser(history, redirect = "/") {
    const { tokenAuth } = localStorage;
    const sendToLogin = () => {
      localStorage.removeItem('tokenAuth');
      history.push('/login');
    }

    Api.GetUser(tokenAuth).then(res => {
      if (res.status === 201) {
        store.dispatch(setAccount(res.data));
        history.push(redirect);
      } else sendToLogin();
    }).catch(sendToLogin);
  }

  authorize(Composed, props) {
    const { pathname } = props.history.location;
    const { account } = store.getState();

    if (!localStorage.tokenAuth) props.history.push('/login');
    if (account._id) return <Composed {...props} />;
    else this.storeUser(props.history, pathname);
    return null;
  }

  validate(Composed, props) {
    const { account } = store.getState();
    if (!localStorage.tokenAuth) return <Composed {...props} />;
    if (!account._id) this.storeUser(props.history);
    return null;
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Fragment>
            <Route exact path="/" component={e => this.authorize(Home, e)} />
            <Route exact path="/login" component={e => this.validate(Login, e)} />
          </Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;