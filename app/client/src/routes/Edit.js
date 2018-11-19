import React, { Component } from 'react';
import Wrapper from '../components/Wrapper';
import Input from '../components/Input';
import Profile from '../components/ProfileImage.js';
import File from '../components/FileInput.js';
import Button from '../components/Button.js';
import Label from '../components/Label.js';

export default class Edit extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Wrapper name={'Edit Athlete/Agent Profile'}>
        <div className="d-flex flex-row">
          <div className="col-md-2">
            <Profile src="http://lorempixel.com/120/120/" />
          </div>
          <div className="col-md-10">
            <div className="d-flex flex-column">
              <div className="col-md-8 mt-3">
                <Label label="Full Name" />
                <Input name="name" />
              </div>
              <div className="col-md-8 mt-3">
                <Label label="Email Address" />
                <Input name="email" />
              </div>
              <div className="col-md-8 mt-3">
                <Label label="Phone Number" />
                <Input name="phone" />
              </div>
              <div className="col-md-8 mt-3">
                <Label label="Change Picture" />
                <File />
              </div>
              <div className="col-md-8 mt-3">
                <hr />
                <Button text="Save" bigSize />
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}
