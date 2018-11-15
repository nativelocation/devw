import React, { Component, Fragment } from 'react';
import Wrapper from '../components/Wrapper';
import Profile from '../components/ProfileView.js';
import IconInfo from '../components/IconInfo.js';



export default class Client extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wrapperType: true
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
            <button type="button" className={this.state.wrapperType ? "btn btn-light btn-sm active" : "btn btn-light btn-sm"} onClick={this.changeList}><span className="jam jam-grid-f"></span><span className="jam jam-grid-f"></span></button>
            <button type="button" className={this.state.wrapperType ? "btn btn-light btn-sm" : "btn btn-light active btn-sm"} onClick={this.changeList}><span className="jam jam-align-justify" style={{ fontSize: 25 }}></span><span className="jam jam-align-justify" style={{ fontSize: 25 }}></span></button>
          </div>
        </div>
        <div className={this.state.wrapperType ? "d-flex flex-column mt-3 col-md-6" : "d-flex flex-row mt-3 col-md-6"}>
          <Profile src="/assets/img/4.jpg" title="Maria Hamilton" subtitle="Administrator" orientation={this.state.wrapperType ? true : false} >
            <div className={this.state.wrapperType ? "d-flex justify-content-end px-3 pt-3" : ""} style={{ flex: 1 }}>
              <IconInfo icon="jam jam-eye">
                <Profile src="/assets/img/4.jpg" title="Maria Hamilton" subtitle="Administrator" />
              </IconInfo>
              <IconInfo icon="jam jam-eyedropper px-1" />
              {!this.state.wrapperType ?
                <Fragment>
                  <IconInfo icon="jam jam-shield" />
                  <IconInfo icon="jam jam-document px-1" />
                  <IconInfo icon="jam jam-envelope " />
                </Fragment>
                : null}
            </div>
          </Profile>
        </div>
      </Wrapper>
    );
  }
}
