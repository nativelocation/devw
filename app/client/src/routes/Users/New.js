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
    userType: '',
    confirmPassword: '',
    fileImage: {},
    errors: {}
  }

  validateForm() {
    const formData = new FormData();
    let { name, email, phone, password, userType, confirmPassword, fileImage, errors } = this.state;

    if (_.isEmpty(name)) errors.name = 'Name is required';
    if (_.isEmpty(email)) errors.email = 'Email is required';
    if (_.isEmpty(phone)) errors.phone = 'Phone is required';
    if (_.isEmpty(password)) errors.password = 'Password is required';
    if (_.isEmpty(confirmPassword)) errors.confirmPassword = 'Confirm Password is required';
    if (_.isEmpty(userType)) errors.userType = 'User Type is required';

    if (!errors.email && !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))
      errors.email = `Email format is invalid: ${email}`;
    if (!errors.phone && phone.length <= 10)
      errors.phone = 'Phone length must be higher than 10';
    if (!errors.password && password.length <= 6)
      errors.password = 'Password length must be higher than 6';
    if (!errors.confirmPassword && !_.isEqual(password, confirmPassword))
      errors.confirmPassword = 'Password confirmation must match with password field';

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return false;
    }

    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('password', password);
    //TODO: server says must be numeric, check.
    formData.append('type', userType);
    //TODO: validate fileImage and try to reduce size
    formData.append('image', fileImage);

    return formData;
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
    const { name, value } = e.target;
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
                  <Input name="name" onChange={this.onChange.bind(this)} error={!_.isEmpty(errors.name)} />
                  <Error text={errors.name} />
                </div>
                <div className=" mt-3">
                  <Label label="Email Address" />
                  <Input name="email" disableSpaces onChange={this.onChange.bind(this)} error={!_.isEmpty(errors.email)} />
                  <Error text={errors.email} />
                </div>
                <div className="mt-3">
                  <Label label="Phone Number" />
                  <Input name="phone" onChange={this.onChange.bind(this)} error={!_.isEmpty(errors.phone)} type="tel" disableSpaces max={13} beforeSet={this.phoneSet} />
                  <Error text={errors.phone} />
                </div>
                <div className="col-md-6 pl-0 mt-3">
                  <Label label="Picture" />
                  <FileInput placeholder={fileImage.name} name="picture" onChange={this.onChangeFileImage.bind(this, "fileImage")} />
                  <Error text={errors.picture} />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mt-3">
                  <Label label="Password" />
                  <Input name="password" onChange={this.onChange.bind(this)} error={!_.isEmpty(errors.password)} password />
                  <Error text={errors.password} />
                </div>
                <div className="mt-3">
                  <Label label="Confirm Password" />
                  <Input name="confirmPassword" onChange={this.onChange.bind(this)} error={!_.isEmpty(errors.confirmPassword)} password />
                  <Error text={errors.confirmPassword} />
                </div>
                <div className="mt-4">
                  <h4>User Type</h4>
                  <hr />
                  <RadioButton onChange={this.onChange.bind(this)} value='1' name="userType" text="Administrator" />
                  <RadioButton onChange={this.onChange.bind(this)} value='2' name="userType" text="Manager" />
                  <Error text={errors.userType} />
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