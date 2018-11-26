import React, { Component } from 'react';
import Wrapper from '../../components/Wrapper';
import Input from '../../components/Input';
import Label from '../../components/Label';
import Button from '../../components/Button';
import { connect } from 'react-redux';
import _ from 'lodash';
import Api from '../../config/api';
import Error from '../../components/Error';
import SweetAlert from 'sweetalert-react';
import { COLORS } from '../../config/constants';

class Register extends Component {

  state = {
    name: '',
    errors: {},
    id: this.props.match.params.id || '',
    alertProps: { title: 'Alert' },
    alertShow: false,
  }

  componentDidMount() {
    this.getTeam();
  }

  validateForm() {
    let { name, errors } = this.state;
    if (_.isEmpty(name)) errors.name = 'Name is required';

    this.setState({ errors });
    if (Object.keys(errors).length > 0) return false;

    return { name }
  }

  onChange(e) {
    const { name, value } = e.target;
    let { errors } = this.state;
    delete errors[name]
    this.setState({ [name]: value, errors });
  }

  registerTeam() {
    this.setState({ errors: {} });
    const { account } = this.props;
    const { id } = this.state;
    const data = this.validateForm();
    // return console.log('entro a registro', data);
    if (data) {
      const register = !id ? Api.CreateTeam(account.tokenAuth, data) : Api.UpdateTeam(account.tokenAuth, { ...data, _id: id });
      //TODO:Add loading stuff
      register.then(res => {
        if (res.status === 201) { 
          this.setState({ alertShow: false });
          this.props.history.push('/team');
        }
        console.log('res :', res);
      }).catch(err => {
        //TODO: show error
        console.log('err :', err);
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ alertShow: true, alertProps: this.getSaveAlertProps() });
  }

  getTeam = () => {
    const { id } = this.state;
    const { account } = this.props;
    if (id) {
      Api.GetTeam(account.tokenAuth, id).then(res => {
        if (res.status === 201) {
          this.setState({ name: res.data.name })
          const n = res.data.name;
          this.refs.inputTeamName.setValue(n);
          // console.log('res :', name);
        }
      }).catch(err => {
        //TODO: show error
        console.log('err :', err);
      });
    }
  }

  getSaveAlertProps() {
    const { id } = this.state;
    return {
      title: `${!id ? 'Create Team' : 'Edit Team'}`,
      text: `Are you sure to ${!id ? 'save the team' : 'edit the team'}?`,
      showCancelButton: true,
      confirmButtonColor: COLORS.Success,
      onConfirm: this.registerTeam.bind(this),
      onCancel: () => this.setState({ alertShow: false })
    };
  }

  render() {
    const { errors, name, alertProps, alertShow } = this.state;
    const links = [
      { name: 'Team', link: '/team' },
    ];
    return (
      <Wrapper name='Create a new team' breadcrumb={links}>
        <div className='d-flex flex-column'>
          <form onSubmit={this.onSubmit.bind(this)}>
            <div className="col-md-12">
              <Label label='Name' />
              <Input ref="inputTeamName" name='name' onChange={this.onChange.bind(this)} error={!_.isEmpty(errors.name)} >{name}</Input>
              <Error text={errors.name} />
            </div>
            <hr />
            <div className='mr-3'>
              <Button text='Send' bigSize />
            </div>
          </form>
        </div>
        <SweetAlert show={alertShow} {...alertProps} />
      </Wrapper>
    );
  }
}
export default connect(s => ({ account: s.account }))(Register)