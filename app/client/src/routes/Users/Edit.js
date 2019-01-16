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

class Edit extends Component {
  state = {
    id: this.props.match.params.id || "",
    firstName: "",
    lastName: "",
    email: "",
    rol: "",
    errorMessage: "",
    loading: false,
    alertProps: { title: "Alert" },
    alertShow: false
  };

  async componentWillMount() {
    await this.getUser(this.state.id);
  }

  onLogout() {
    localStorage.removeItem("tokenAuth");
    window.location.reload();
  }

  getUser = id => {
    const { account, history } = this.props;
    this.setState({ loading: true });

    Api.GetUser(account.tokenAuth, id)
      .then(res => {
        if (res.status === 201) {
          const { firstName, lastName, email, role } = res.data;
          this.setState({
            loading: false,
            firstName: firstName,
            lastName: lastName,
            email: email,
            rol: String(role)
          });
        } else history.push(`/user`);
      })
      .catch(err => {
        this.setState({ loading: false });
        history.push("/user");
      });
  };

  back() {
    const { history } = this.props;
    history.push(`/user`);
  }

  onSubmit(e) {
    e.preventDefault();
    const { firstName, lastName, rol } = this.state;
    if (_.isEmpty(firstName))
      return this.setState({ errorMessage: "First name is required" });
    if (_.isEmpty(lastName))
      return this.setState({ errorMessage: "Last name is required" });
    this.setState({ alertShow: true, alertProps: this.getSaveAlertProps() });
  }

  editUser() {
    const { account } = this.props;
    const { firstName, lastName, email, rol, id } = this.state;
    let role = parseInt(rol);
    const data = { firstName, lastName, email, role, id };
    this.setState({ loading: true });
    Api.UpdateUser(account.tokenAuth, data)
      .then(res => {
        if (res.status === 201) {
          this.setState({ loading: false, alertShow: true });
          const alertProps = this.getSuccessAlertProps(() => {
            this.setState({ alertShow: false }, () =>
              this.props.history.push("/user")
            );
          });
          this.setState({ alertProps, errorMessage: "" });
        } else {
          this.setState({
            loading: false,
            errorMessage: res.message,
            alertShow: false
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
  }

  confirmData() {}

  render() {
    const {
      loading,
      errorMessage,
      firstName,
      lastName,
      email,
      alertShow,
      alertProps,
      rol,
      id
    } = this.state;
    const { account } = this.props;
    let disabledRol = account._id === id ? "disabled" : undefined;
    let showEdit = !loading ? (
      <div className="mt-3">
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <small className="form-text text-muted">First Name</small>
              <input
                name="firstName"
                type="text"
                className="form-control"
                value={firstName}
                onChange={this.onChange.bind(this)}
              />
            </div>
            <div className="form-group col-md-6">
              <small className="form-text text-muted">Last Name</small>
              <input
                name="lastName"
                type="text"
                className="form-control"
                value={lastName}
                onChange={this.onChange.bind(this)}
              />
            </div>
            <div className="form-group col-md-6">
              <small className="form-text text-muted">Email</small>
              <input
                name="email"
                type="email"
                className="form-control"
                value={email}
                onChange={this.onChange.bind(this)}
                disabled
              />
            </div>
            <div className="form-group col-md-6">
              <small className="form-text text-muted">Role</small>
              <select
                className="form-control"
                name="rol"
                onChange={this.onChange.bind(this)}
                value={rol}
                disabled={disabledRol}
              >
                <option value="1">Super Admin</option>
                <option value="2">Admin</option>
              </select>
            </div>
            <Button text="Update" filter />
            <button
              type="button"
              className="btn btn-link text-muted nounderline "
              onClick={this.back.bind(this)}
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
    ) : (
      undefined
    );
    return (
      <Fragment>
        <Sidebar admin="admin" />
        <Wrapper title="Edit User" onClick={this.onLogout} hideLink>
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
      title: "Update User",
      text: "Are you sure to update the user?",
      showCancelButton: true,
      confirmButtonColor: COLORS.Success,
      onConfirm: this.editUser.bind(this),
      onCancel: () => this.setState({ alertShow: false, loading: false })
    };
  }

  getSuccessAlertProps(onClick) {
    return {
      title: "User Updated",
      text: `The user has been updated successfully`,
      type: "success",
      confirmButtonColor: COLORS.Success,
      onConfirm: onClick.bind(this)
    };
  }
}
export default connect(s => ({ account: s.account }))(Edit);
