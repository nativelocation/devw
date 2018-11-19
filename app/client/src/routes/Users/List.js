import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Api from '../../config/api';

import Wrapper from '../../components/Wrapper';
import Loading from '../../components/Loading';
import Button from '../../components/Button';
import IconInfo from '../../components/IconInfo';
import Profile from '../../components/ProfileView';

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
          <Fragment>
            {users.map(u =>
              <div key={u._id} className="d-flex flex-row mt-3 col-md-6">
                <Profile src="/assets/img/4.jpg" title={u.name} subtitle="Administrator" orientation>
                  <div className="d-flex justify-content-end align-items-center px-3">
                    <IconInfo icon="jam jam-eye" />
                    <IconInfo icon="jam jam-eyedropper px-1" />
                  </div>
                </Profile>
              </div>
            )}
          </Fragment>
          :
          <Loading />
        }
        {/* src="/assets/img/4.jpg" */}
        <div className="d-flex flex-row mt-3 col-md-6">
          <Profile src="/assets/img/4.jpg" title="Maria Hamilton" subtitle="Administrator" orientation>
            <div className="d-flex justify-content-end align-items-center px-3">
              <IconInfo icon="jam jam-eye" />
              <IconInfo icon="jam jam-eyedropper px-1" />
            </div>
          </Profile>
        </div>
      </Wrapper>
    );
  }
}

export default connect(s => ({ account: s.account }))(Users)