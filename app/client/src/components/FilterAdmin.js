import React, { Component, Fragment } from "react";
import { FONTS } from "../config/constants";
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

  changePass() {
    const { changePass } = this.props;
    if (changePass) changePass(true);
  }

  onChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    const { account } = this.props;
    return (
      <Fragment>
        {account.role > 1 &&
          <Fragment>
            <p className="text-white ml-2" style={styles.titleDate}>
              <Link to="/" className="text-white nounderline" style={{ fontSize: 14 }}>Dashboard</Link>
            </p>
            <hr />
          </Fragment>
        }
        {account.role === 1 &&
          <Fragment>
            <p className="text-white ml-2" style={styles.titleDate}>
              <Link to="/user" className="text-white nounderline" style={{ fontSize: 14 }}>Users</Link>
            </p>
            <hr />
          </Fragment>
        }
        {account.role < 2 &&
          <Fragment>
            <p className="text-white ml-2" style={styles.titleDate}>
              <Link to="/admin" className="text-white nounderline" style={{ fontSize: 14 }}>Developers</Link>
            </p>
            <hr />
          </Fragment>
        }
        <p className="text-white ml-2" style={styles.titleDate}>
          <Link to="/dailygoals" className="text-white nounderline" style={{ fontSize: 14 }}>Daily Goals</Link>
        </p>
        <hr />
        <p className="text-white ml-2" style={styles.titleDate}>
          <Link to="/profile" className="text-white nounderline" style={{ fontSize: 14 }}>Profile</Link>
        </p>
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
