import React, { Component, Fragment } from "react";
import { COLORS } from "../config/constants";

export default class Sidebar extends Component {
  render() {
    return (
      <div className="d-flex flex-row h-100">
        <div className="col-md-3 bg-secondary">
          <div >
            <h2 style={styles.titleSidebar} className="text-white">Dev View</h2>
            <hr/>
          </div>
        </div>
        <div className="col-md-9 d-flex">
          <h2>Content</h2>
        </div>
      </div>
    );
  }
}

const styles = {
  titleSidebar: {
      paddingTop: 30
  }
};
