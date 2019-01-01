import React, { Component, Fragment } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import Loading from '../components/Loading';
import Alert from '../components/Alert';
import { COLORS } from '../config/constants';

export default class Login extends Component {

  state = {
    errorMessage: '',
    loading: false,
    revealPass: false,
    email: '',
    password: ''
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.history.push('/dashboard');
  }

  render() {
    const { loading, errorMessage } = this.state;

    return (
      <Fragment>
        <div style={styles.around} className='w-100 gradient'></div>
        <div id="loginBox" className="d-flex flex-wrap justify-content-center align-items-center" style={styles.formBox}>
          <div className="col-md-6 col-lg-6 col-xl-3">
            <div>
              <h1 className="mb-3 mt-5 text-black">Dev View</h1>
              <div>
                <form onSubmit={this.onSubmit.bind(this)}>
                  <div className="form-group" style={styles.mb}>
                    <Input name='email' showPassword disableAutoComplete bigSize />
                  </div>
                  <div className="form-group">
                    <Input name='password' disableAutoComplete password bigSize />
                  </div>
                  <Alert type="danger" hide={!errorMessage}>{errorMessage}</Alert>
                  <Button text="Login" bigSize />
                </form>
              </div>
            </div>
          </div>
          <Loading show={loading} absolute backgroundClass="bg-gray" textColor="#fff" text="LOGIN IN.." />
        </div>
      </Fragment >
    );
  }
}

const styles = {
  formBox: {
    flex: 1
  },
  mb: {
    marginBottom: -10,
  },
  around: {
    height: 70,
    position: 'fixed',
    zIndex: 1100
  }
}