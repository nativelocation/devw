import React, { Component } from 'react';
import Wrapper from '../../components/Wrapper';
import Input from '../../components/Input';
import Label from '../../components/Label';
import Button from '../../components/Button';
import { connect } from 'react-redux';
import _ from 'lodash';
import Api from '../../config/api';
import Error from '../../components/Error';

export default class NewTeam extends Component {

  state = { 
    name: '',
    errors: {}
  }

  onChange(e) {
    const { name, value } = e.target;
    let { errors } = this.state;
    delete errors[name]
    this.setState({ [name]: value, errors });
  }

  render() {
    const { errors } = this.state;
    return (
      <Wrapper name='Create a new team'>
        <div className='d-flex flex-column'>
          <form>
            <div className="col-md-12">
              <Label label='Name' />
              <Input name='name' onChange={this.onChange.bind(this)} error={!_.isEmpty(errors.name)}/>
              <Error text={errors.name} />
            </div>
            <hr />
            <div className='mr-3'>
              <Button text='Send' bigSize />
            </div>
          </form>
        </div>
      </Wrapper>
    );
  }
}
