import React, { Component } from 'react';
import { connect } from 'react-redux';
import Api from '../../config/api';

import Wrapper from '../../components/Wrapper';
import Loading from '../../components/Loading';
import Button from '../../components/Button';

class Users extends Component {

  state = {
    users: []
  };

  componentWillMount() {
    const { account } = this.props;
    Api.GetUsers(account.tokenAuth).then(res => {
      if (res.status === 201) {

        this.setState({ users: res.data });
      }
    }).catch(err => {

    });
  }

  newUser() {
    const { history } = this.props;
    history.push('/user/new');
  }

  render() {
    const { users } = this.state;
    return (
      <Wrapper name='Users'>
        <Button text='Add new user' onClick={this.newUser.bind(this)} />
        {users.length > 0 ?
          <ul>
            {users.map(u => <li key={u._id}>{u.name}</li>)}
          </ul>
          :
          <Loading />
        }
      </Wrapper>
    );
  }
}

export default connect(s => ({ account: s.account }))(Users)