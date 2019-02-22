import React, { Component, Fragment } from "react";
import { FONTS } from "../config/constants";
import Filter from "./Filter";
import FilterAdmin from "./FilterAdmin";

export default class Sidebar extends Component {
  state = {
    show: true
  }

  handleCollapse(e, value) {
    const { onCollapse } = this.props;
    this.setState({ show: value });
    if (onCollapse) onCollapse(value);
  }

  render() {
    const { show } = this.state;
    const { onSubmit, admin, profile, contentItems } = this.props;
    let filter = admin ? <FilterAdmin profile={profile} /> : <Filter onSubmit={onSubmit} />
    if (show)
      return (
        <div className="col-md-2 col-lg-2 px-0 h-100" style={{ backgroundColor: '#666667' }}>
          <button style={styles.floatButton} className="text-white btn btn-link" onClick={e => this.handleCollapse(e, false)}>
            <h4><i className="fa fa-chevron-left" /></h4>
          </button>
          <h3 style={styles.titleSidebar} className="text-white pl-3">
            Dev View
          </h3>
          <hr />
          {contentItems || filter}
        </div>
      );
    else return (
      <div style={{ width: '50px', backgroundColor: '#666667' }}>
        <button className="text-white pl-3 btn btn-link" onClick={e => this.handleCollapse(e, true)}>
          <h3><i className="fa fa-chevron-right" /></h3>
        </button>
      </div>
    );

  }
}

const styles = {
  titleSidebar: {
    fontFamily: FONTS.RobotoLight,
    paddingTop: 30
  },
  floatButton: {
    position: 'absolute',
    right: 0
  }
};
