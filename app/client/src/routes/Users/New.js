import React, { Component } from 'react';

import Wrapper from '../../components/Wrapper';
import Label from '../../components/Label';
import Input from '../../components/Input';
import Button from '../../components/Button';
import FileInput from '../../components/FileInput';
import RadioButton from '../../components/RadioButton';

export default class NewUser extends Component {

  fileInput = React.createRef();
  state = {
    name: '',
    email: '',
    phone: '',
    picture: '',
    password: '',
    confirmPassword: '',
    fileImage: {}
  }

  onSubmit(e) {
    e.preventDefault();
    console.log('this.fileInput.current.files[0].name :', this.fileInput.current.files[0]);

    const { email, password } = this.state;
    //TODO:Add loading stuff
    // Api.Login({ email, password }).then(res => {
    //   if (status === 201) {

    //   }
    // }).catch(err => {
    //   //TODO: show error
    // });
  }

  onChange(e) {
    console.log('this.fileInput.current.files[0] :', this.fileInput.current.files[0]);
    console.log(e.target.value)
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { fileImage } = this.state;
    console.log('fileImage.length :', fileImage.length);
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
                  <FileInput refFile={this.fileInput} placeholder={fileImage.length > 0} name="picture" onChange={this.onChange.bind(this)} />
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
