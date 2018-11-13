import React, { Component } from 'react';
import Wrapper from '../components/Wrapper';
import Input from '../components/Input';
import File from '../components/FileInput.js';
import Button from '../components/Button.js';
import Radio from '../components/RadioButton.js';
import Label from '../components/Label.js';



export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Wrapper name={'Add An Athlete/Agent'}>
        <div className="d-flex flex-row">
          <div className="col-md-6">
            <div className="form-group">
              <Label label="Full name" />
              <Input />
            </div>
            <div className="form-group">
              <Label label="Email address" />
              <Input />
            </div>
            <div className="form-group">
              <Label label="Phone number" />
              <Input />
            </div>
            <Label label="Please select" b />
            <div className="form-group">
              <Radio text="Athlete" id="radio1" name="custom" inline/>
              <Radio text="Agent" id="radio2" name="custom" inline/>
              <hr/> 
              <Radio text="Athlete" id="radio3" name="custom"/>
              <Radio text="Agent" id="radio4" name="custom"/>
            </div>
            <div className="form-group">
              <Label label="Picture" b />
              <File />
            </div>
            <div className="form-group">
              <hr />
              <Button text="Save" bigSize />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <Label label="Password" />
              <Input password />
            </div>
            <div className="form-group">
              <Label label="Confirm password" />
              <Input password />
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}
