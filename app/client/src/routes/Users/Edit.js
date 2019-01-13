import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Api from "../../config/api";
import Wrapper from "../../components/Wrapper";
import Sidebar from "../../components/Sidebar";
import Alert from "../../components/Alert";
import Loading from "../../components/Loading";
import Button from "../../components/Button";
import _ from "lodash";

const roles = new Array();
roles[1] = "Super Admin";
roles[2] = "Admin";

class Edit extends Component {
  state = {
    user: [],
    id: this.props.match.params.id || '',
    showTable: true,
    fullName: "",
    lastName: "",
    email: "",
    role: 1,
    password: "12345678",
    errorMessage: "",
    loading: false,
    isEdit: false
  };

  async componentWillMount() {}

  onLogout() {
    localStorage.removeItem("tokenAuth");
    window.location.reload();
  }

  adminUser = id => {};

  onSubmit(e) {
    e.preventDefault();
    const { account } = this.props;
    const { firstName, lastName, email, role, password } = this.state;
    const data = { firstName, lastName, email, role, password };
    this.setState({ loading: true });

    Api.CreateUser(account.tokenAuth, data)
      .then(res => {
        console.log(res);
        if (res.status === 201) {
          this.setState({ loading: false, showTable: true, errorMessage: "" });
          this.getAll();
        } else {
          this.setState({
            loading: false,
            errorMessage: res.message
          });
        }
      })
      .catch(err => {
        console.log(err);
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

  render() {
    const { loading, errorMessage } = this.state;
    return (
      <Fragment>
        <Sidebar admin="admin" />
        <Wrapper name="User:" onClick={this.onLogout}>
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
                <Button text="Create" />
                <button
                  type="button"
                  className="btn btn-link text-muted nounderline "
                  onClick={() =>
                    this.setState({ showTable: true, errorMessage: "" })
                  }
                  style={{ fontSize: 14 }}
                >
                  Back
                </button>
              </div>
            </form>
            <div className="pt-3">
              <Alert type="danger" hide={!errorMessage}>
                {errorMessage}
              </Alert>
            </div>
          </div>
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
}
export default connect(s => ({ account: s.account }))(Edit);
