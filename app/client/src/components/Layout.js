import React, { Component } from "react";
import ErrorCatch from "../components/ErrorCatch";

export default class Layout extends Component {
  render() {
    const { children } = this.props;
    return (
      <ErrorCatch>
        <div className="d-flex flex-column" style={styles.flex}>
          <div className="d-flex flex-row" style={styles.flex}>
            {children}
          </div>
        </div>
      </ErrorCatch>
    );
  }
}

const styles = {
  flex: {
    flex: 1
  }
};
