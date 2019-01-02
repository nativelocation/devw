import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./routes/Login";
import Dashboard from "./routes/Dashboard";
import NotFound from './routes/NotFound';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Dashboard} />
            <Route component={NotFound} />
          </Switch>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
