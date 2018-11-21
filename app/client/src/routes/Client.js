import React, { Component, Fragment } from 'react';
import Wrapper from '../components/Wrapper';
import Profile from '../components/ProfileView';
import IconInfo from '../components/IconInfo';
import Icons from '../components/Icon';
import ToggleButton from '../components/ToggleButton';


export default class Client extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wrapperType: true
    }
    // this.changeList = this.changeList.bind(this);
  }

  changeList = type => {
    this.setState({ wrapperType: type });
  }

  render() {
    const { wrapperType } = this.state;
    return (
      <Wrapper name={'Athlete/Agent'}>
      <ToggleButton onChange={this.changeList.bind(this)}/>
        <div className={this.state.wrapperType ? "d-flex flex-column mt-3 col-md-6" : "d-flex flex-row mt-3 col-md-6"}>
          <Profile src="/assets/img/4.jpg" title="Maria Hamilton" subtitle="Administrator" orientation={wrapperType ? true : false} >
            <div className={wrapperType ? "d-flex justify-content-end px-3 pt-3" : ""} style={{ flex: 1 }}>
              <IconInfo color="#2C3A41" hover="#777777" icon="eye">
                <Profile src="/assets/img/4.jpg" title="Maria Hamilton" subtitle="Administrator" />
              </IconInfo>
              <IconInfo color="#2C3A41" hover="#777777" icon="eyedropper px-1" />
              {!wrapperType ?
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
