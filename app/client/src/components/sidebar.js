import React, { Component, Fragment } from "react";
import { FONTS } from "../config/constants";

export default class Sidebar extends Component {
  render() {
    return (
      <div className="col-md-3 col-lg-3 px-0 h-100 bg-secondary">
          <h3 style={styles.titleSidebar} className="text-white pl-3">
            Dev View
          </h3>
          <hr />
      </div>
    );
  }
}

const styles = {
  titleSidebar: {
    fontFamily: FONTS.RobotoLight,
    paddingTop: 30
  }
};
