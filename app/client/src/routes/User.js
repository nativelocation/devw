import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Api from "../config/api";
import Wrapper from "../components/Wrapper";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import Loading from "../components/Loading";
import Input from "../components/Input";
import Button from "../components/Button";

const roles = new Array();
roles[1] = "Super Admin";
roles[2] = "Admin";

class User extends Component {
  state = {
    user: [],
    showTable: true,
    fullName: "",
    lastName: "",
    email: "",
    role: 1,
    password: "12345678",
    errorMessage: "",
    loading: false
  };

  async componentWillMount() {
    const { account } = this.props;
    const all = await Api.GetAllUser(account.tokenAuth);
    this.setState({ user: all });
  }

  onLogout() {
    localStorage.removeItem("tokenAuth");
    window.location.reload();
  }

  NewUser = () => {
    this.setState({ showTable: !this.state.showTable });
  };

  onSubmit(e) {
    e.preventDefault();
    const { account } = this.props;
    const { firstName, lastName, email, role, password } = this.state;
    const data = { firstName, lastName, email, role, password }
    console.log(firstName, lastName, email, role, password);

    Api.CreateUser(account.tokenAuth, data)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err)
      });
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { user, showTable, loading, errorMessage } = this.state;
    console.log(user);
    if (user.data) {
      const res = user.data;
      var users = res.map((r, i) => {
        let fullName = `${r.firstName} ${r.lastName}`;
        let role = roles[r.role];
        return (
          <tr key={i}>
            <td>{fullName}</td>
            <td>{role}</td>
            <td>
              <div className="d-flex flex-row justify-content-center">
                <Link
                  to="/edit"
                  className="text-muted nounderline p-1"
                  style={{ fontSize: 14 }}
                >
                  Edit
                </Link>
                <Link
                  to="/delete"
                  className="text-muted nounderline p-1"
                  style={{ fontSize: 14 }}
                >
                  Delete
                </Link>
              </div>
            </td>
          </tr>
        );
      });
    }

    let buttonNew = showTable ? (
      <button
        type="button"
        className="btn btn-light text-muted nounderline "
        onClick={this.NewUser.bind(this)}
        style={{ fontSize: 14 }}
      >
        New
      </button>
    ) : (
      undefined
    );

    let table = (
      <div className="d-flex flex-row table-responsive tableProjects">
        <table className="table table-striped table-hover table-borderless">
          <thead>
            <tr>
              <th>Name</th>
              <th>Active</th>
              <th />
            </tr>
          </thead>
          <tbody>{users}</tbody>
        </table>
      </div>
    );

    let formUser = (
      <div className="mt-3">
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <small className="form-text text-muted">First Name</small>
              <input
                name="firstName"
                type="text"
                className="form-control"
                onChange={this.onChange.bind(this)}
              />
            </div>
            <div className="form-group col-md-6">
              <small className="form-text text-muted">Last Name</small>
              <input
                name="lastName"
                type="text"
                className="form-control"
                onChange={this.onChange.bind(this)}
              />
            </div>
            <div className="form-group col-md-6">
              <small className="form-text text-muted">Email</small>
              <input
                name="email"
                type="email"
                className="form-control"
                onChange={this.onChange.bind(this)}
              />
            </div>
            <div className="form-group col-md-6">
              <small className="form-text text-muted">Role</small>
              <input
                name="role"
                type="text"
                className="form-control"
                placeholder="Super Admin"
                disabled
              />
            </div>
            <Alert type="danger" hide={!errorMessage}>
              {errorMessage}
            </Alert>
            <Button text="Create" />
            <button
              type="button"
              className="btn btn-link text-muted nounderline "
              onClick={this.NewUser.bind(this)}
              style={{ fontSize: 14 }}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    );

    let show = showTable ? table : formUser;
    return (
      <Fragment>
        <Sidebar admin="admin" />
        <Wrapper name="User:" onClick={this.onLogout}>
          <div className="d-flex flex-row">{buttonNew}</div>
          {show}
          <Loading
            show={loading}
            absolute
            backgroundClass="bg-gray"
            textColor="#fff"
            text="LOGIN IN.."
          />
        </Wrapper>
      </Fragment>
    );
  }
}
export default connect(s => ({ account: s.account }))(User);
