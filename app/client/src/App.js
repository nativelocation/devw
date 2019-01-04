import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./redux";
import Auth from "./config/auth";
import Login from "./routes/Login";
import Dashboard from "./routes/Dashboard";
import NotFound from "./routes/NotFound";

const store = configureStore();
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Fragment>
            <Switch>
              <Route
                exact
                path="/login"
                component={e => Auth.validate(Login, e, store)}
              />
              <Route exact path="/" component={e => Auth.authorize(Dashboard, e, store)} />
              <Route component={NotFound} />
            </Switch>
          </Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
