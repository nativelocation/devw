import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Wrapper extends Component {
  onLogout() {
    localStorage.removeItem("tokenAuth");
    window.location.reload();
  }

  render() {
    const { children, title, account, maxWidth } = this.props;
    let showTitle = title ? <h5 className="float-left">{title}</h5> : undefined;
    let showDash = account.role === 1 ? (
      <Link
        to="/"
        className="btn btn-link mx-1 text-muted float-right btnLogout nounderline"
        style={styles.mt}
      >
        Dashboard
        </Link>
    ) : undefined
    return (
      <div className="h-100 p-0 d-flex flex-column" style={{ flex: 1, maxWidth }}>
        <div
          className="col-md-12 col-lg-12 d-flex flex-column"
          style={styles.flex}
        >
          <div
            className="col-md-12 col-lg-12 m-0 p-3"
            style={{ flex: "unset" }}
          >
            {showTitle}
            <a
              className="btn btn-link btn-group mx-1 text-muted float-right btnLogout nounderline dropdown-toggle-split"
              style={styles.mt}
              id="dropdownMenuReference" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent"
            >
              {`${account.firstName} ${account.lastName}`} <span className='jam jam-chevron-down'></span>
            </a>
            <div className="dropdown-menu dropdown-menu-right logoutBox mr-4">
              <a className="dropdown-item pointer text-muted" onClick={this.onLogout}>Logout</a>
            </div>
            <Link
              to="/dailygoals"
              className="btn btn-link mx-1 text-muted float-right btnLogout nounderline"
              style={styles.mt}
            >
              Daily Goals
            </Link>
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
