import React, { Component } from 'react';

import Wrapper from '../../components/Wrapper';
import Label from '../../components/Label';
import Input from '../../components/Input';
import Button from '../../components/Button';
import FileInput from '../../components/FileInput';
import RadioButton from '../../components/RadioButton';

export default class NewUser extends Component {

  render() {
    return (
      <Wrapper name='Add new user'>
        <div className="d-flex flex-column">
          <div className="row">
            <div className="col-md-6">
              <div className="mt-3">
                <Label label="Full Name" />
                <Input name="name" />
              </div>
              <div className=" mt-3">
                <Label label="Email Address" />
                <Input name="email" />
              </div>
              <div className="mt-3">
                <Label label="Phone Number" />
                <Input name="phone" />
              </div>
              <div className="mt-3">
                <Label label="Picture" />
                <FileInput />
              </div>
            </div>

            <div className="col-md-6">
              <div className="mt-3">
                <Label label="Password" />
                <Input name="password" password />
              </div>
              <div className="mt-3">
                <Label label="Confirm Password" />
                <Input name="confirmPassword" password />
              </div>
              <div className="mt-4">
                <h4>User Type</h4>
                <hr />
                <RadioButton text="Administrator" id="userType01" name="userType"  />
                <RadioButton text="Manager" id="userType02" name="userType"  />
              </div>
            </div>
          </div>

          <div className="mt-3">
            <hr />
            <Button text="Save User" bigSize />
          </div>
        </div>
      </Wrapper>
    );
  }
}
