import React, { Component, Fragment } from "react";
import Api from '../config/api';
import Input from "../components/Input";
import Button from "../components/Button";
import Loading from "../components/Loading";
import Alert from "../components/Alert";


export default class Login extends Component {
  state = {
    errorMessage: "",
    loading: false,
    revealPass: false,
    email: "",
    password: ""
  };

  onSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    this.setState({ loading: true });

    Api.Login({ email, password })
      .then(res => {
        const { status, data } = res;
        let errorMessage = "";
        if (status === 201) {
          if (data.user.role > 3) errorMessage = "User not authorized";
          else {
            localStorage.setItem("tokenAuth", data.token);
            this.props.history.push("/");
          }
        } else errorMessage = res.message;
        this.setState({ loading: false, errorMessage });
      })
      .catch(err => {
        this.setState({ loading: false, errorMessage: err.message });
      });
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value, errorMessage: '' });
  }

  render() {
    const { loading, errorMessage } = this.state;

    return (
      <Fragment>
        <div style={styles.around} className="w-100 gradient" />
        <div
          id="loginBox"
          className="d-flex flex-wrap justify-content-center align-items-center"
          style={styles.formBox}
        >
          <div className="col-md-6 col-lg-6 col-xl-3">

            <div>
              <h1 className="mb-3 mt-5 text-black">Dev View</h1>
              <div>
                <form onSubmit={this.onSubmit.bind(this)}>
                  <div className="form-group" style={styles.mb}>
                    <Input
                      name="email"
                      onChange={this.onChange.bind(this)}
                      showPassword
                      disableAutoComplete
                      bigSize
                    />
                  </div>
                  <div className="form-group">
                    <Input
                      name="password"
                      onChange={this.onChange.bind(this)}
                      disableAutoComplete
                      password
                      bigSize
                    />
                  </div>
                  <Alert type="danger" hide={!errorMessage}>
                    {errorMessage}
                  </Alert>
                  <Button text="Login" bigSize />
                </form>
              </div>
              <Loading
                show={loading}
                absolute
                backgroundClass="bg-white"
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const styles = {
  formBox: {
    flex: 1
  },
  mb: {
    marginBottom: -10
  },
  around: {
    height: 70,
    position: "fixed",
    zIndex: 1100
  }
};
