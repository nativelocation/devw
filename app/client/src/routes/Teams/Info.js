import React, { Component, Fragment } from 'react';
import Wrapper from '../../components/Wrapper';
import Profile from '../../components/ProfileView';
import IconInfo from '../../components/IconInfo';
import ToggleButton from '../../components/ToggleButton';
import { connect } from 'react-redux';
import _ from 'lodash';
import Api from '../../config/api';

class Info extends Component {
  state = {
    wrapperType: true,
    id: this.props.match.params.id || '',
    name: '',
  }

  componentDidMount() {
    this.getTeam();
  }

  getTeam = () => {
    const { id } = this.state;
    const { account } = this.props;
    if (id) {
      Api.GetTeam(account.tokenAuth, id).then(res => {
        if (res.status === 201) {
          this.setState({ name: res.data.name })
          console.log('res :', this.state.name);
        }
      }).catch(err => {
        //TODO: show error
        console.log('err :', err);
      });
    }
  }

  changeList = type => {
    this.setState({ wrapperType: type });
  }

  render() {
    const { wrapperType, name } = this.state;
    return (
      <Wrapper name={`TEAM: ${name}`}>
        <ToggleButton onChange={this.changeList.bind(this)} />
        <div className='col-md-12'>

        </div>
        <div className={`d-flex mt-3 col-md-6 ${wrapperType ? 'flex-row' : 'flex-column'}`}>
          <Profile src="/assets/img/4.jpg" title="Maria Hamilton" subtitle="Administrator" orientation={wrapperType ? false : true} >
            <div className={!wrapperType ? "d-flex justify-content-end px-3 pt-3" : ""} style={{ flex: 1 }}>
              <IconInfo color="#2C3A41" hover="#777777" icon="eye">
                <Profile src="/assets/img/4.jpg" title="Maria Hamilton" subtitle="Administrator" />
              </IconInfo>
              <IconInfo color="#2C3A41" hover="#777777" icon="eyedropper px-1" />
              {wrapperType ?
                <Fragment>
                  <IconInfo color="#2C3A41" hover="#777777" icon="shield" />
                  <IconInfo color="#2C3A41" hover="#777777" icon="document px-1" />
                  <IconInfo color="#2C3A41" hover="#777777" icon="envelope " />
                </Fragment>
                : null}
            </div>
          </Profile>
        </div>
      </Wrapper>
    );
  }
}

export default connect(s => ({ account: s.account }))(Info)
