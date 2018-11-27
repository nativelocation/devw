import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import SweetAlert from 'sweetalert-react';
import Api from '../../config/api';
import { COLORS } from '../../config/constants';

import Wrapper from '../../components/Wrapper';
import Label from '../../components/Label';
import Input from '../../components/Input';
import Button from '../../components/Button';
import FileInput from '../../components/FileInput';
import RadioButton from '../../components/RadioButton';
import Error from '../../components/Error';
import Loading from '../../components/Loading';

class NewUser extends Component {

  state = {
    alertProps: { title: 'Alert' },
    alertShow: false,
    loading: false,
    name: '',
    email: '',
    phone: '',
    password: '',
    userType: '',
    confirmPassword: '',
    fileImage: {},
    errors: {},
    formData: false
  }

  validateForm() {
    const byteFileAllowed = 5 * 1000000;
    const validMimetypes = ['image/jpeg', 'image/png', 'image/gif'];
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
    if (!errors.phone && phone.length < 10)
      errors.phone = 'Phone length must be higher or equal than 10';
    if (!errors.password && password.length < 6)
      errors.password = 'Password length must be higher or equal than 6';
    if (!errors.confirmPassword && !_.isEqual(password, confirmPassword))
      errors.confirmPassword = 'Password confirmation must match with password field';

    if (fileImage.type) {
      const { type, size } = fileImage;
      if (size > byteFileAllowed)
        errors.picture = 'File requires to be lower than 5mb';
      if (!validMimetypes.includes(type.toLowerCase()))
        errors.picture = 'File must be an image';
    }

    this.setState({ errors });
    if (Object.keys(errors).length > 0) return false;

    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('password', password);
    formData.append('type', userType && userType.length > 0 ? Number.parseInt(userType) : 1);
    formData.append('image', fileImage);

    this.setState({ formData, alertShow: true, alertProps: this.getSaveAlertProps() });
  }

  createUser() {
    this.setState({ errors: {}, loading: true });
    const { account } = this.props;
    const { formData } = this.state;

    if (formData) {
      Api.CreateUser(account.tokenAuth, formData).then(res => {
        if (res.status === 201) {
          this.setState({ formData: false, alertShow: false });
          this.props.history.push('/user');
        }
        console.log('res :', res);
        this.setState({ loading: false });
      }).catch(err => {
        this.setState({ loading: false });
        console.log('err :', err);
      });
    } else this.setState({ formData: false, alertShow: false, loading: false });
  }

  onChange(e) {
    const { name, value } = e.target;
    let { errors } = this.state;
    delete errors[name]
    this.setState({ [name]: value, errors });
  }

  onChangeFileImage(nameField, e) {
    const { name, value, files } = e.target;
    let { errors } = this.state;
    delete errors[name]
    this.setState({ [nameField]: files[0], errors });
  }

  phoneSet(value, next) {
    const hasPlus = value.substring(0, 1) === '+';
    value = hasPlus ? value.substring(1, value.length) : value;
    if (!isNaN(value) || _.isEmpty(value)) next();
  }

  onSubmit(e) {
    e.preventDefault();
    this.validateForm();
  }

  getSaveAlertProps() {
    return {
      title: "Create User",
      text: "Are you sure to save the user?",
      showCancelButton: true,
      confirmButtonColor: COLORS.Success,
      onConfirm: this.createUser.bind(this),
      onCancel: () => this.setState({ formData: false, alertShow: false })
    };
  }

  render() {
    const { fileImage, errors, alertProps, alertShow, loading } = this.state;
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
                <div className="col-md-9 pl-0 mt-3">
                  <Label label="Picture" />
                  <FileInput placeholder={fileImage.name} name="picture" onChange={this.onChangeFileImage.bind(this, "fileImage")} error={!_.isEmpty(errors.picture)} />
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
              <button type="button" class="btn btn-link text-danger float-right">Cancel</button>
            </div>
          </form>
        </div>
        <SweetAlert show={alertShow} {...alertProps} />
        <Loading show={loading} absolute/>
      </Wrapper>
    );
  }
}
export default connect(s => ({ account: s.account }))(NewUser)