import React, { Component, Fragment } from "react";
import { FONTS } from "../config/constants";
import Filter from "./Filter";
import FilterAdmin from "./FilterAdmin";

export default class Sidebar extends Component {
  render() {
    const { onSubmit, admin, profile } = this.props;
    let filter = admin ? <FilterAdmin profile={profile} /> : <Filter onSubmit={onSubmit} />
    return (
      <div className="col-md-3 col-lg-3 px-0 h-100" style={{backgroundColor: '#666667'}}>
        <h3 style={styles.titleSidebar} className="text-white pl-3">
          Dev View
        </h3>
        <hr />
        {filter}
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
