import React, { Component, Fragment } from 'react';
import { COLORS, FONTS } from '../config/constants';
import Api from '../config/api';
import Input from '../components/Input';
import Button from '../components/Button';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      revealPass: false,
      email: '',
      password: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    //TODO:Add loading stuff
    Api.Login({ email, password }).then(res => {
      const { status, data } = res;
      if (status === 201) {
        localStorage.setItem('tokenAuth', data.token);
        this.props.history.push('/');
      }
    }).catch(err => {
      //TODO: show error
    });
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <Fragment>
        <div style={styles.around} className='w-100 gradient'></div>
        <div id="loginBox" className="d-flex flex-wrap justify-content-center align-items-center" style={styles.formBox}>
          <div className="col-md-6 col-lg-6 col-xl-3">
            <div className='col-md-11' >
              <img src='assets/img/hypergolic-logoWhite.png' className='img-fluid' />
            </div>
            <div>
              <h2 style={styles.titleBox} className="mb-3 mt-5">Admin</h2>
              <div>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <Input name='email' onChange={this.onChange} showPassword disableAutoComplete />
                  </div>
                  <div className="form-group position-relative">
                    <Input name='password' onChange={this.onChange} disableAutoComplete password />
                  </div>
                  <Button text="Login" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const styles = {
  formBox: {
    paddingTop: 70
  },
  around: {
    height: 70,
    position: 'fixed'
  },
  titleBox: {
    color: COLORS.White,
    fontFamily: FONTS.RalewayMedium,
    fontSize: 28
  }
}
