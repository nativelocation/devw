import React, { Component, Fragment } from 'react';
import Wrapper from '../components/Wrapper';
import Profile from '../components/ProfileView.js';
import IconInfo from '../components/IconInfo.js';



export default class Client extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wrapperType: false
    }
    this.changeList = this.changeList.bind(this);
  }

  changeList = () => {
    this.setState({ wrapperType: !this.state.wrapperType });
    console.log('lol');
  }

  render() {
    return (
      <Wrapper name={'Athlete/Agent'}>
        <div className="d-flex flex-row">
          <div className="btn-group" role="group">
            <button type="button" className={this.state.wrapperType ? "btn btn-light active" : "btn btn-light"} onClick={this.changeList}><i className="fas fa-grip-horizontal"></i> <i className="fas fa-grip-horizontal"></i></button>
            <button type="button" className={this.state.wrapperType ? "btn btn-light" : "btn btn-light active"} onClick={this.changeList}><i className="fas fa-bars"></i> <i className="fas fa-bars"></i></button>
          </div>
        </div>
        <div className={this.state.wrapperType ? "d-flex flex-column mt-3 col-md-6" : "d-flex flex-row mt-3 col-md-6"}>
          <Profile src="/assets/img/4.jpg" title="Maria Hamilton" subtitle="Administrator" orientation={this.state.wrapperType ? true : false} >
            <div className={this.state.wrapperType ? "d-flex justify-content-end pl-2 pt-3 pr-1" : ""} style={{ flex: 1 }}>
              <IconInfo icon="fas fa-eye pr-1" />
              <IconInfo icon="fas fa-pen px-1" />
              {!this.state.wrapperType ?
                <Fragment>
                  <IconInfo icon="fas fa-shield-alt px-1" />
                  <IconInfo icon="fas fa-file-alt px-1" />
                  <IconInfo icon="fas fa-envelope pl-1" />
                </Fragment>
                : null}
            </div>
          </Profile>
        </div>
      </Wrapper>
    );
  }
}
