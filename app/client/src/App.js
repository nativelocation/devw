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

  storeUser(history, redirect) {
    const { tokenAuth } = localStorage;
    const { account } = store.getState();
    const sendToLogin = () => {
      localStorage.removeItem('tokenAuth');
      history.push('/login');
    }

    if (!account._id) {
      console.log('object :');
      Api.GetUser(tokenAuth).then(res => {
        //TODO: edit fetch to get only status 201, maybe others, but never 500
        if (res.status === 201) {
          store.dispatch(setAccount(res.data));
          if (redirect) history.push(redirect);
        } else sendToLogin();
      }).catch(sendToLogin);
    }
  }

  authorize(Composed, props) {
    if (!localStorage.tokenAuth) props.history.push('/login');
    else this.storeUser(props.history);
    return <Composed {...props} />;
  }

  validate(Composed, props) {
    if (localStorage.tokenAuth) this.storeUser(props.history, '/');
    return <Composed {...props} />;
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