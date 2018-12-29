import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./routes/Login";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Switch>
            <Route path="/" component={Login} />
          </Switch>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
