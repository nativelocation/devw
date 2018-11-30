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
import SelectInput from '../../components/SelectInput';

class RegisterUser extends Component {
  state = {
    id: this.props.match.params.id || '',
    isEdit: this.props.match.params.id ? true : false,
    isProfile: false,
    data: {},
    fileImage: {},
    formData: false,
    teams: [],

    errors: {},
    errorMessage: '',
    alertProps: { title: 'Alert' },
    alertShow: false,
    loading: false,
    modified: false
  }

  componentDidMount() {
    if (!this.state.isEdit) {
      const { match, account } = this.props;
      const isProfile = match.url.includes('profile');
      
      if (isProfile)
      this.setState({ id: account._id, isProfile, isEdit: true }, this.verifyUser);
    } else this.verifyUser();
  }

  getTeams = () => {
    const { account } = this.props;
    let { data, isEdit } = this.state;
    Api.GetTeams(account.tokenAuth).then(res => {
      if (res.status === 201) {
        if(!isEdit) data.teamId = '-1'
        this.setState({ teams: res.data, data });
      }
    }).catch(err => {

    });
  }

  verifyUser() {
    const { account, history } = this.props;
    const { id } = this.state;

    if (id) {
      this.setState({ loading: true });
      Api.GetUser(account.tokenAuth, id).then(res => {
        if (res.status === 201) {
          const { email, name, phone, type, teamId } = res.data;
          this.setState({ loading: false, data: { email, name, phone, userType: type.toString(), teamId: teamId || '-1' } });
          this.getTeams();
        } else history.push('/user');
      }).catch(err => {
        history.push('/user');
      });
    }
  }

  validateForm() {
    const byteFileAllowed = 5 * 1000000;
    const validMimetypes = ['image/jpeg', 'image/png', 'image/gif'];
    const formData = new FormData();
    let { fileImage, errors, data, id, isEdit } = this.state;
    let { name, email, phone, password, userType, confirmPassword, teamId } = data;
    console.log(teamId)
    if (_.isEmpty(name)) errors.name = 'Name is required';
    if (_.isEmpty(email)) errors.email = 'Email is required';
    if (_.isEmpty(phone)) errors.phone = 'Phone is required';
    if (!isEdit && _.isEmpty(password)) errors.password = 'Password is required';
    if (!isEdit && _.isEmpty(confirmPassword)) errors.confirmPassword = 'Confirm Password is required';
    if (_.isEmpty(userType)) errors.userType = 'User Type is required';
    if(userType === '2' && teamId === '-1') errors.teamId = "Team is required";
    else delete errors.teamId;

    if (!errors.email && !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))
      errors.email = `Email format is invalid: ${email}`;
    if (!errors.phone && phone.length < 10)
      errors.phone = 'Phone length must be higher or equal than 10';
    if (password && !errors.password && password.length < 6)
      errors.password = 'Password length must be higher or equal than 6';
    if (password && !errors.confirmPassword && !_.isEqual(password, confirmPassword))
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

    formData.append('id', id);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('type', userType && userType.length > 0 ? Number.parseInt(userType) : 1);
    if (userType === '2') formData.append('teamId', teamId);
    if (password) formData.append('password', password);
    if (fileImage.type) formData.append('image', fileImage);

    this.setState({ formData, alertShow: true, alertProps: this.getSaveAlertProps(), modified: true });
  }

  createUser() {
    this.setState({ errors: {}, loading: true, errorMessage: "" });
    const { account } = this.props;
    const { formData, isEdit } = this.state;
    const closeProcess = msg => this.setState({ formData: false, alertShow: false, loading: false, errorMessage: msg || "" });

    if (formData) {
      const request = isEdit ? Api.UpdateUser : Api.CreateUser;
      request(account.tokenAuth, formData).then(res => {
        if (res.status === 201) {

          const alertProps = this.getSuccessAlertProps(() => {
            this.setState({ alertShow: false }, () => this.props.history.push('/user'));
          });
          this.setState({ formData: false, alertProps, loading: false });

        } else closeProcess(res.message)
      }).catch(err => closeProcess(err.message));
    } else closeProcess();
  }

  onChange(e) {
    const { name, value } = e.target;
    let { errors, data } = this.state;
    delete errors[name]
    data[name] = value;
    this.setState({ data, errors, modified: true });
  }

  onChangeFileImage(nameField, e) {
    const { name, files } = e.target;
    let { errors } = this.state;
    delete errors[name]
    this.setState({ [nameField]: files[0], errors, modified: true });
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

  onCancel() {
    if (this.state.modified) {
      const onClickCancel = () => this.setState({ alertShow: false }, () => this.props.history.push('/user'))
      this.setState({ alertShow: true, alertProps: this.getCancelAlertProps(onClickCancel) });
    } else this.props.history.push('/user');
  }

  render() {
    const { account } = this.props;
    const { fileImage, errorMessage, errors, alertProps, alertShow, loading, data, isEdit, isProfile, id, teams } = this.state;
    const items = teams.map(r => ({ name: r.name, value: r._id }));
    const links = [
      { name: 'Users', link: '/user', onClick: this.onCancel.bind(this) },
      { name: isEdit ? isProfile ? 'Update Profile' : 'Update User' : 'New User' },
    ];
    //TODO: change behavior for profile when cancel(no idea) it can't send to user's list because may be a manager and they don't have access
    return (
      <Wrapper name={isEdit ? isProfile ? 'Update profile' : 'Update current user' : 'Add new user'} breadcrumb={links}>
        <div className="d-flex flex-column">
          <form onSubmit={this.onSubmit.bind(this)}>
            <div className="row">
              <div className="col-md-6">
                <div className="mt-3">
                  <Label label="Full Name" />
                  <Input value={data.name} name="name" onChange={this.onChange.bind(this)} error={!_.isEmpty(errors.name)} />
                  <Error text={errors.name} />
                </div>
                <div className="mt-3">
                  <Label label="Email Address" />
                  <Input value={data.email} disabled={isEdit} name="email" disableSpaces onChange={this.onChange.bind(this)} error={!_.isEmpty(errors.email)} />
                  <Error text={errors.email} />
                </div>
                <div className="mt-3">
                  <Label label="Phone Number" />
                  <Input value={data.phone} name="phone" onChange={this.onChange.bind(this)} error={!_.isEmpty(errors.phone)} type="tel" disableSpaces max={13} beforeSet={this.phoneSet} />
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
                  <Input value={data.password} name="password" onChange={this.onChange.bind(this)} error={!_.isEmpty(errors.password)} password />
                  <Error text={errors.password} />
                </div>
                <div className="mt-3">
                  <Label label="Confirm Password" />
                  <Input value={data.confirmPassword} name="confirmPassword" onChange={this.onChange.bind(this)} error={!_.isEmpty(errors.confirmPassword)} password />
                  <Error text={errors.confirmPassword} />
                </div>
                {id !== account._id ?
                  < div className="mt-4">
                    <h4>User Type</h4>
                    <hr />
                    <RadioButton checked={data.userType === '1'} onChange={this.onChange.bind(this)} value='1' name="userType" text="Administrator" />
                    <RadioButton checked={data.userType === '2'} onChange={this.onChange.bind(this)} value='2' name="userType" text="Manager" />
                    <Error text={errors.userType} />
                    <div className={`${data.userType === '2' ? 'visible' : 'invisible'} mt-3`}>
                      <SelectInput name="teamId" value={data.teamId} items={items} placeholder onChange={this.onChange.bind(this)} />
                      <Error text={errors.teamId} />
                    </div>
                  </div>
                  : null}
              </div>
            </div>

            <div className="mt-3">
              <hr />
              <span className="text-danger">{errorMessage}</span>
              <Button text={isEdit ? isProfile ? 'Update Profile' : 'Update User' : 'Create User'} bigSize />
              <Button text="Cancel" bigSize link onClick={this.onCancel.bind(this)} />
            </div>
          </form>
        </div>
        <SweetAlert show={alertShow} {...alertProps} />
        <Loading show={loading} absolute />
      </Wrapper >
    );
  }

  getSaveAlertProps() {
    const { isEdit } = this.state;
    return {
      title: `${isEdit ? 'Update' : 'Create'} User`,
      text: `Are you sure to ${isEdit ? 'update' : 'create'} the user?`,
      showCancelButton: true,
      confirmButtonColor: COLORS.Success,
      onConfirm: this.createUser.bind(this),
      onCancel: () => this.setState({ formData: false, alertShow: false })
    };
  }

  getSuccessAlertProps(onClick) {
    const { isEdit } = this.state;
    return {
      title: `User ${isEdit ? 'Updated' : 'Created'}`,
      text: `The user has been ${isEdit ? 'updated' : 'created'} successfully`,
      type: "success",
      confirmButtonColor: COLORS.Success,
      onConfirm: onClick.bind(this)
    };
  }

  getCancelAlertProps(onClickCancel) {
    const { isEdit } = this.state;
    return {
      title: "Cancel request",
      text: `Are you sure to cancel the ${isEdit ? 'current' : 'new'} user?`,
      type: "info",
      showCancelButton: true,
      confirmButtonColor: COLORS.Danger,
      onConfirm: onClickCancel.bind(this),
      onCancel: () => this.setState({ alertShow: false })
    };
  }
}
export default connect(s => ({ account: s.account }))(RegisterUser)