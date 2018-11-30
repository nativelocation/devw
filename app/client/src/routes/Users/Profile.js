import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ROLES } from '../../config/constants';

import Wrapper from '../../components/Wrapper';
import ProfileImage from '../../components/ProfileImage';
import ButtonLarge from '../../components/ButtonLarge';
import Label from '../../components/Label';

class Profile extends Component {
  state = {
    data: {}
  };

  componentDidMount() {
    const { account } = this.props;
    this.setState({ data: account });
  }

  onClickEdit() {
    const { history } = this.props;
    history.push('/profile/edit');
  }


  render() {
    const { data } = this.state;

    return (
      <Wrapper name='View User Profile'>
        <ButtonLarge text="Edit" className="float-right" onClick={this.onClickEdit.bind(this)} />
        <div className="d-flex flex-row">
          <div className="col-md-3">
            <ProfileImage src={"https://placekitten.com/200/200?" + data._id} width='150' position='left' />
          </div>
          <div className="col-md-9 d-flex flex-column">
            <Label label="Full name" labelClass="form-text text-muted mb-2" />
            <h4>{data.name}</h4>
            <Label label="Email address" labelClass="form-text text-muted mb-2" />
            <h4>{data.email}</h4>
            <Label label="Phone number" labelClass="form-text text-muted mb-2" />
            <h4>{data.phone}</h4>
            <Label label="User Type" labelClass="form-text text-muted" b />
            <h4>{ROLES[data.type]}</h4>
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default connect(s => ({ account: s.account }))(Profile)