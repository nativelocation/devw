import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Wrapper extends Component {
  onLogout() {
    localStorage.removeItem("tokenAuth");
    window.location.reload();
  }

  render() {
    const { children, onScroll } = this.props;
    return (
      <div className="col-md-9 col-lg-9 h-100 p-0 d-flex flex-column">
        <div
          className="col-md-12 col-lg-12 p-3 d-flex flex-column"
          style={styles.flex}
          onScroll={onScroll}
        >
          <div className="col-md-12 col-lg-12 m-0 p-3" style={{ flex: "unset" }}>
            <button
              type="button"
              className="btn btn-link mx-1 text-muted float-right btnLogout nounderline"
              onClick={this.onLogout}
            >
              Logout
            </button>
            <Link
              to="/admin"
              className="btn btn-link mx-1 text-muted float-right btnLogout nounderline"
            >
              Admin
            </Link>
          </div>
          <div className="col-md-12 col-lg-12 bg-white p-2 d-flex flex-column" style={styles.flex}>{children}</div>
        </div>
      </div>
    );
  }
}

const styles = {
  flex: {
    flex: 1
  }
};
export default connect(s => ({ account: s.account }))(Wrapper);
