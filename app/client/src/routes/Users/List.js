import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Api from '../../config/api';

import Wrapper from '../../components/Wrapper';
import Loading from '../../components/Loading';
import Button from '../../components/Button';
import IconInfo from '../../components/IconInfo';
import Profile from '../../components/ProfileView';

class Users extends Component {

  state = {
    loading: true,
    users: []
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

  render() {
    const { users, loading } = this.state;
    const links = [{ name: 'Users' }];
    return (
      <Wrapper name='Users' breadcrumb={links}>
        <Button text='Add new user' onClick={this.newUser.bind(this)} />
        {!loading ?
          <Fragment>
            {users.map(u =>
              <div key={u._id} className="d-flex flex-row mt-3 col-md-6">
                <Profile src="/assets/img/4.jpg" title={u.name} subtitle="Administrator" orientation>
                  <div className="d-flex justify-content-end align-items-center px-3">
                    <IconInfo color="#2C3A41" hover="#777777" icon="eye" />
                    <IconInfo color="#2C3A41" hover="#77777" icon="eyedropper px-1" onClick={this.editUser.bind(this, u._id)} />
                  </div>
                </Profile>
              </div>
            )}
          </Fragment>
          :
          <Loading show />
        }
      </Wrapper>
    );
  }
}

export default connect(s => ({ account: s.account }))(Users)