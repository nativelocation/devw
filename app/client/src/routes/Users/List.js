import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Api from "../../config/api";
import Wrapper from "../../components/Wrapper";
import Sidebar from "../../components/Sidebar";
import Alert from "../../components/Alert";
import Loading from "../../components/Loading";
import Button from "../../components/Button";
import _ from "lodash";
import SweetAlert from "sweetalert-react";
import { COLORS } from "../../config/constants";

const roles = new Array();
roles[1] = "Super Admin";
roles[2] = "Admin";
roles[3] = "User";

class List extends Component {
  state = {
    user: [],
    idUser: "",
    showTable: true,
    fullName: "",
    lastName: "",
    email: "",
    rol: 1,
    password: "12345678",
    errorMessage: "",
    loading: false,
    isEdit: false,
    alertProps: { title: "Alert" },
    alertShow: false,
    disabledButton: false
  };

  async componentWillMount() {
    this.getAll();
  }

  getAll = async () => {
    const { account } = this.props;
    const all = await Api.GetAllUser(account.tokenAuth);
    this.setState({ user: all });
  };

  onLogout() {
    localStorage.removeItem("tokenAuth");
    window.location.reload();
  }

  adminUser = id => {
    const { idUser } = this.state;
    console.log();
    this.setState({ showTable: false, isEdit: true });
  };

  editUser(id) {
    const { history } = this.props;
    history.push(`/user/edit/${id}`);
  }

  onSubmit(e) {
    e.preventDefault();
    const { firstName, lastName, email } = this.state;
    if (_.isEmpty(firstName)) return this.setState({ errorMessage: 'First name is required' });
    if (_.isEmpty(lastName)) return this.setState({ errorMessage: 'Last name is required' });
    if (_.isEmpty(email)) return this.setState({ errorMessage: 'Email is required' });
    this.setState({ alertShow: true, alertProps: this.getSaveAlertProps() });
  }

  saveUser() {
    const { account } = this.props;
    const { firstName, lastName, email, rol, password } = this.state;
    let role = parseInt(rol);
    const data = { firstName, lastName, email, role, password };
    this.setState({ loading: true });
    Api.CreateUser(account.tokenAuth, data)
      .then(res => {
        console.log(res);
        if (res.status === 201) {
          this.setState({ loading: false, alertShow: true });
          const alertProps = this.getSuccessAlertProps(() => {
            this.setState({ alertShow: false, showTable: true });
          });
          this.setState({ alertProps, errorMessage: "" });
          this.getAll();
        } else {
          this.setState({
            errorMessage: res.message,
            alertShow: false,
            loading: false,
          });
        }
      })
      .catch(err => {
        this.setState({
          errorMessage: err.message,
          loading: false
        });
      });
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value, errorMessage: "" });
    this.existsEmail(e);
  }

  existsEmail(e) {
    let email = e.target.value;
    const data = { email };
    const { account } = this.props;
    this.setState({ disabledButton: false, errorMessage: "" })
    Api.EmailValidation(account.tokenAuth, data)
      .then(res => {
        if (res.status === 201) {
          this.setState({ errorMessage: "" })
        } else {
          this.setState({ disabledButton: true, errorMessage: "The email already exists" })
        }
      })
      .catch(err => {
        this.setState({
          errorMessage: err.message,
          loading: false
        });
      });
  }

  showDeleteUserAlert(id) {
    const alertProps = this.getDeleteAlertProps(id);
    this.setState({ alertShow: true, alertProps });
  }

  deleteUser(id) {
    const { account } = this.props;
    const closeProcess = errorMessage =>
      this.setState({ alertShow: false, errorMessage });
    if (id) {
      Api.DeleteUser(account.tokenAuth, id)
        .then(res => {
          if (res.status === 201) {
            this.setState({ alertProps: this.getSuccessDeleteAlertProps() });
            this.getAll();
          } else closeProcess(res.message);
        })
        .catch(err => {
          if (err.message) closeProcess(err.message);
        });
    } else closeProcess("Error Id Required");
  }

  render() {
    const {
      user,
      showTable,
      loading,
      errorMessage,
      alertShow,
      alertProps,
      rol,
      disabledButton
    } = this.state;
    const { account } = this.props;
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
                <a
                  className="text-muted nounderline p-1"
                  style={{ fontSize: 14 }}
                  onClick={this.editUser.bind(this, r._id)}
                >
                  Edit
                </a>
                {r._id !== account._id ? (
                  <a
                    className="text-muted nounderline p-1"
                    style={{ fontSize: 14 }}
                    onClick={this.showDeleteUserAlert.bind(this, r._id)}
                  >
                    Delete
                  </a>
                ) : (
                    undefined
                  )}
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
        onClick={() => this.setState({ showTable: false, errorMessage: "" })}
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
              <select
                className="form-control"
                name="rol"
                onChange={this.onChange.bind(this)}
                value={rol}
              >
                <option value="1">Super Admin</option>
                <option value="2">Admin</option>
                <option value="3">User</option>
              </select>
            </div>
            <div className="col-md-12 text-muted">
              Default password will be "12345678"
            </div>
            <Button text="Create" filter disabled={disabledButton ? true : false} />
            <button
              type="button"
              className="btn btn-link text-muted nounderline "
              onClick={() =>
                this.setState({ showTable: true, errorMessage: "" })
              }
              style={{ fontSize: 14 }}
            >
              Cancel
            </button>
          </div>
        </form>
        <div className="pt-3">
          <Alert type="danger" hide={!errorMessage}>
            {errorMessage}
          </Alert>
        </div>
      </div>
    );

    let show = showTable ? table : formUser;
    let title = showTable ? "Users" : "Create User";
    let showForm = !loading ? show : undefined;
    return (
      <Fragment>
        <Sidebar admin="admin" />
        <Wrapper title={title} onClick={this.onLogout} hideLink>
          <div className="d-flex flex-row">{buttonNew}</div>
          {showForm}
          <SweetAlert show={alertShow} {...alertProps} />
          <Loading
            show={loading}
            absolute
            backgroundClass="bg-gray"
            textColor="#020202"
            text="LOADING.."
          />
        </Wrapper>
      </Fragment>
    );
  }

  getSaveAlertProps() {
    return {
      title: "Create User",
      text: "Are you sure to create the user?",
      showCancelButton: true,
      confirmButtonColor: COLORS.Success,
      onConfirm: this.saveUser.bind(this),
      onCancel: () => this.setState({ alertShow: false })
    };
  }

  getSuccessAlertProps(onClick) {
    return {
      title: "User Created",
      text: `The user has been created successfully`,
      type: "success",
      confirmButtonColor: COLORS.Success,
      onConfirm: onClick.bind(this)
    };
  }

  getDeleteAlertProps(id) {
    return {
      title: "Delete User",
      text: "Are you sure to delete the user?",
      showCancelButton: true,
      type: "info",
      confirmButtonColor: COLORS.Danger,
      onConfirm: this.deleteUser.bind(this, id),
      onCancel: () => this.setState({ alertShow: false })
    };
  }

  getSuccessDeleteAlertProps() {
    return {
      title: "User Deleted",
      text: "The user has been deleted",
      type: "success",
      confirmButtonColor: COLORS.Success,
      onConfirm: () => this.setState({ alertShow: false, loading: false })
    };
  }
}
export default connect(s => ({ account: s.account }))(List);
