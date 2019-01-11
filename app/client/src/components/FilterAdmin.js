import React, { Component, Fragment } from "react";
import { FONTS } from "../config/constants";
import SelectInput from "./SelectInput";
import Button from "./Button";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Collapse extends Component {
  state = {
    value: "today" || ""
  };

  onSubmit(e) {
    e.preventDefault();
    // console.log("State ", this.state.value);
    const { onSubmit } = this.props;
    if (onSubmit) onSubmit(date);
  }

  onChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <Fragment>
        <form onSubmit={this.onSubmit.bind(this)}>
          <p className="text-white ml-2" style={styles.titleDate}>
            <Link
              to="/"
              className="text-white nounderline"
              style={{ fontSize: 14 }}
            >
              Dashboard
            </Link>
          </p>
          <hr />
          <p className="text-white ml-2" style={styles.titleDate}>
            <Link
              to="/users"
              className="text-white nounderline"
              style={{ fontSize: 14 }}
            >
              Users
            </Link>
          </p>
          <hr />
          <p className="text-white ml-2" style={styles.titleDate}>
            Developers:
          </p>
          <hr />
          <div className="d-flex flex-row bg-info ml-2">
            <Button text="Apply" bigSize />
            <button type="button" className="btn btn-link">
              Clear
            </button>
          </div>
        </form>
      </Fragment>
    );
  }
}

const styles = {
  titleDate: {
    fontFamily: FONTS.RobotoLight,
    fontSize: 14,
    paddingLeft: 10
  }
};

export default connect(s => ({ account: s.account }))(Collapse);
