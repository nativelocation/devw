import React, { Component } from 'react';
import { connect } from 'react-redux';
import Api from '../../config/api';

import Wrapper from '../../components/Wrapper';
import Label from '../../components/Label';
import Input from '../../components/Input';
import Button from '../../components/Button';
import FileInput from '../../components/FileInput';
import RadioButton from '../../components/RadioButton';

class NewUser extends Component {

  state = {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    fileImage: {}
  }
  fileInput = React.createRef();

  validateForm() {

  }

  onSubmit(e) {
    e.preventDefault();
    const { account } = this.props;
    const { email, password } = this.state;
    const formData = new FormData();
    formData.append('name', 'lala')
    //TODO: Resolver formdata


    console.log(formData);
    //TODO:Add loading stuff
    Api.CreateUser(account.tokenAuth, formData).then(res => {
      if (status === 201) {

      }
      console.log('res :', res);
    }).catch(err => {
      //TODO: show error
      console.log('err :', err);
    });
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  onChangeFileImage(name) {
    this.setState({ [name]: this.fileInput.current.files[0] });
  }

  render() {
    const { fileImage } = this.state;
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
                  <Input name="email" onChange={this.onChange.bind(this)} />
                </div>
                <div className="mt-3">
                  <Label label="Phone Number" />
                  <Input name="phone" onChange={this.onChange.bind(this)} />
                </div>
                <div className="mt-3">
                  <Label label="Picture" />
                  <FileInput refFile={this.fileInput} placeholder={fileImage.name} name="picture" onChange={this.onChangeFileImage.bind(this, "fileImage")} />
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