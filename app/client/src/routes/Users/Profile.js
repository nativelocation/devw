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


  render() {
    const { data } = this.state;

    return (
      <Wrapper name='View User Profile'>
        <div className="d-flex flex-column">
          <div className="col-md-12"><ButtonLarge text="Edit" /></div>
          <div className="col-md-12 d-flex flex-row">
            <div className="col-md-2">
              <ProfileImage src={"https://picsum.photos/200/200?" + data._id} width='150' />
            </div>
            <div className="col-md-10 d-flex flex-column">
              <Label label="Full name" labelClass="form-text text-muted mb-1" />
              <h4>{data.name}</h4>
              <Label label="Email address" labelClass="form-text text-muted mb-1" />
              <h4>{data.email}</h4>
              <Label label="Phone number" labelClass="form-text text-muted mb-1" />
              <h4>{data.phone}</h4>
              <Label label="User Type" labelClass="form-text text-muted" b />
              <h4>{ROLES[data.type]}</h4>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default connect(s => ({ account: s.account }))(Profile)