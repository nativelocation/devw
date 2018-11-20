import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Api from '../../config/api';

import Wrapper from '../../components/Wrapper';
import Label from '../../components/Label';
import Input from '../../components/Input';
import Button from '../../components/Button';
import FileInput from '../../components/FileInput';
import RadioButton from '../../components/RadioButton';
import Error from '../../components/Error';

class NewUser extends Component {

  state = {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    fileImage: {},
    errors: {}
  }

  validateForm() {
    const formData = new FormData();
    let { name, email, phone, password, confirmPassword, fileImage, errors } = this.state;

    try {
      if (_.isEmpty(phone)) throw { key: 'phone', value: 'Phone is required' };



      formData.append('image', fileImage);


      return formData;
    }
    catch (e) {
      if (e.key && e.value) errors[e.key] = e.value;
      else throw e;

      this.setState({ errors })
      return false;
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ errors: {} });
    const { account } = this.props;
    const data = this.validateForm();

    if (data) {
      //TODO:Add loading stuff
      Api.CreateUser(account.tokenAuth, data).then(res => {
        if (status === 201) {

        }
        console.log('res :', res);
      }).catch(err => {
        //TODO: show error
        console.log('err :', err);
      });
    }
  }

  onChange(e) {
    const { name, value } = e;
    let { errors } = this.state;
    delete errors[name]
    this.setState({ [name]: value, errors });
  }

  onChangeFileImage(name, event) {
    this.setState({ [name]: event.target.files[0] });
  }

  phoneSet(value, next) {
    const hasPlus = value.substring(0, 1) === '+';
    value = hasPlus ? value.substring(1, value.length) : value;
    if (!isNaN(value) || _.isEmpty(value)) next();
  }

  render() {
    const { fileImage, errors } = this.state;
    return (
      <Wrapper name='Add new user'>
        <div className="d-flex flex-column">
          <form onSubmit={this.onSubmit.bind(this)}>
            <div className="row">
              <div className="col-md-6">
                <div className="mt-3">
                  <Label label="Full Name" />
                  <Input name="name" onChange={this.onChange.bind(this)} />
                </div>
                <div className=" mt-3">
                  <Label label="Email Address" />
                  <Input name="email" disableSpaces onChange={this.onChange.bind(this)} type="email" />
                </div>
                <div className="mt-3">
                  <Label label="Phone Number" />
                  <Input name="phone" onChange={this.onChange.bind(this)} error={!_.isEmpty(errors.phone)} type="tel" disableSpaces max={13} beforeSet={this.phoneSet} />
                  <Error text={errors.phone} />
                </div>
                <div className="col-md-6 pl-0 mt-3">
                  <Label label="Picture" />
                  <FileInput placeholder={fileImage.name} name="picture" onChange={this.onChangeFileImage.bind(this, "fileImage")} />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mt-3">
                  <Label label="Password" />
                  <Input name="password" onChange={this.onChange.bind(this)} password />
                </div>
                <div className="mt-3">
                  <Label label="Confirm Password" />
                  <Input name="confirmPassword" onChange={this.onChange.bind(this)} password />
                </div>
                <div className="mt-4">
                  <h4>User Type</h4>
                  <hr />
                  <RadioButton text="Administrator" id="userType01" name="userType" />
                  <RadioButton text="Manager" id="userType02" name="userType" />
                </div>
              </div>
            </div>

            <div className="mt-3">
              <hr />
              <Button text="Create User" bigSize />
            </div>
          </form>
        </div>
      </Wrapper>
    );
  }
}
export default connect(s => ({ account: s.account }))(NewUser)