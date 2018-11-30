import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Api from '../../config/api';
import { COLORS, ROLES } from '../../config/constants';
import SweetAlert from 'sweetalert-react';

import Wrapper from '../../components/Wrapper';
import Loading from '../../components/Loading';
import Button from '../../components/Button';
import IconInfo from '../../components/IconInfo';
import ProfileView from '../../components/ProfileView';
import ProfileImage from '../../components/ProfileImage';
import ToggleButton from '../../components/ToggleButton';

class Users extends Component {

  state = {
    loading: true,
    users: [],
    alertProps: { title: 'Alert' },
    alertShow: false,
    errorMessage: '',
    wrapperType: true
  };

  componentWillMount() {
    this.getUsers();
  }

  getUsers() {
    const { account } = this.props;
    Api.GetUsers(account.tokenAuth).then(res => {
      if (res.status === 201) {
        this.setState({ users: res.data, loading: false });
      }
    }).catch(err => {
      this.setState({ loading: false });
    });
  }

  newUser() {
    const { history } = this.props;
    history.push('/user/new');
  }

  editUser(id) {
    const { history } = this.props;
    history.push(`/user/edit/${id}`);
  }

  showDeleteUserAlert(id) {
    console.log('idShow :', id);
    const alertProps = this.getDeleteAlertProps(id);
    this.setState({ alertShow: true, alertProps });
  }

  deleteUser(id) {
    const { account } = this.props;
    this.setState({ loading: true });
    const closeProcess = errorMessage => this.setState({ alertShow: false, loading: false, errorMessage });
    if (id) {
      Api.DeleteUser(account.tokenAuth, id).then(res => {
        if (res.status === 201) {
          this.setState({ alertProps: this.getSuccessDeleteAlertProps() });
          this.getUsers();
        } else closeProcess(res.message)
      }).catch(err => {
        if (err.message) closeProcess(err.message)
      });
    } else closeProcess("Error Id Required")

  }

  getDeleteAlertProps(id) {
    return {
      title: 'Delete User',
      text: 'Are you sure to delete the user?',
      showCancelButton: true,
      type: 'info',
      confirmButtonColor: COLORS.Danger,
      onConfirm: this.deleteUser.bind(this, id),
      onCancel: () => this.setState({ alertShow: false })
    };
  }

  getSuccessDeleteAlertProps() {
    return {
      title: 'User Deleted',
      text: 'The user has been deleted',
      type: 'success',
      confirmButtonColor: COLORS.Success,
      onConfirm: () => this.setState({ alertShow: false })
    };
  }

  changeList = type => {
    this.setState({ wrapperType: type });
  }

  render() {
    const { users, loading, alertShow, alertProps, errorMessage, wrapperType } = this.state;
    const { account } = this.props;

    const userList = users.map((u, i) =>
      <div key={i} className={wrapperType ? 'col-md-3' : 'col-md-6'}>
        <ProfileView src={"https://picsum.photos/200/200?" + u._id} title={u.name} subtitle={ROLES[u.type]} orientation={wrapperType ? false : true} >
          <div className={!wrapperType ? "d-flex justify-content-end px-3 pt-3" : ""}>
            <IconInfo icon="eye" hover={COLORS.MediumOrange}>
              <div className='col-md-3'>
                <p>Holi</p>
              </div>
            </IconInfo>
            <IconInfo icon="eyedropper px-1" hover={COLORS.Blue} onClick={this.editUser.bind(this, u._id)} />
            <IconInfo icon="trash" hover={COLORS.Danger} onClick={this.showDeleteUserAlert.bind(this, u._id)} hide={u._id === account._id} />
          </div>
        </ProfileView>
      </div>
    );

    return (
      <Wrapper name='Users' breadcrumb={[{ name: 'Users' }]}>
        <span className="text-danger">{errorMessage}</span>
        <Button text='Add new user' onClick={this.newUser.bind(this)} />
        <ToggleButton onChange={this.changeList.bind(this)} />
        <div className='d-flex mt-3 col-md-12 flex-row flex-wrap'>
          {userList}
        </div>
        <SweetAlert show={alertShow} {...alertProps} />
        <Loading show={loading} absolute />
      </Wrapper>
    );
  }
}

export default connect(s => ({ account: s.account }))(Users)