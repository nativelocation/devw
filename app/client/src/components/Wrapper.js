import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Wrapper extends Component {
  onLogout() {
    localStorage.removeItem("tokenAuth");
    window.location.reload();
  }

  render() {
    const { children, title, account } = this.props;
    let showTitle = title ? <h5 className="float-left">{title}</h5> : undefined;
    let showDash =
      account.role === 1 ? (
        <Link
          to="/"
          className="btn btn-link mx-1 text-muted float-right btnLogout nounderline"
          style={styles.mt}
        >
          Dashboard
        </Link>
      ) : (
        undefined
      );
    return (
      <div className="col-md-10 col-lg-10 h-100 p-0 d-flex flex-column">
        <div
          className="col-md-12 col-lg-12 d-flex flex-column"
          style={styles.flex}
        >
          <div
            className="col-md-12 col-lg-12 m-0 p-3"
            style={{ flex: "unset" }}
          >
            {showTitle}
            <button
              type="button"
              className="btn btn-link mx-1 text-muted float-right btnLogout nounderline"
              onClick={this.onLogout}
              style={styles.mt}
            >
              Logout
            </button>
            {showDash}
            <Link
              to={account.role === 1 ? "/admin" : "profile"}
              className="btn btn-link mx-1 text-muted float-right btnLogout nounderline"
              style={styles.mt}
            >
              Admin
            </Link>
          </div>
          <div
            className="col-md-12 col-lg-12 bg-white d-flex flex-column"
            style={styles.flex}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  flex: {
    flex: 1
  },
  mt: {
    marginTop: -5
  }
};
export default connect(s => ({ account: s.account }))(Wrapper);
