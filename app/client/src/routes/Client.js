import React, { Component } from 'react';
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
            <button type="button" className="btn btn-light" onClick={this.changeList}><i className="fas fa-grip-horizontal"></i> <i className="fas fa-grip-horizontal"></i></button>
            <button type="button" className="btn btn-light" onClick={this.changeList}><i className="fas fa-bars"></i> <i className="fas fa-bars"></i></button>
          </div>
        </div>
        <div className={this.state.wrapperType ? "d-flex flex-row mt-3" : "d-flex flex-column mt-3"}>
          <div className={this.state.wrapperType ? "col-md-6" : "col-md-12 d-flex flex-row"}>
            <div className='col-md-2 hoverBox bg-danger'>
              <Profile src="http://lorempixel.com/80/80/" name="Maria Hamilton" />
              <div className="d-flex flex-row justify-content-between bg-secondary">
                <i className="fas fa-bars"></i>
                <IconInfo />
              </div>
            </div>
            <div className='col-md-2 hoverBox'>
              <Profile src="http://lorempixel.com/80/80/" name="Maria Hamilton" />
            </div>
            <div className='col-md-2 hoverBox'>
              <Profile src="http://lorempixel.com/80/80/" name="Maria Hamilton" />
            </div>
            <div className='col-md-2 hoverBox'>
              <Profile src="http://lorempixel.com/80/80/" name="Maria Hamilton" />
            </div>
            <div className='col-md-2 hoverBox'>
              <Profile src="http://lorempixel.com/80/80/" name="Maria Hamilton" />
            </div>
            <div className='col-md-2 hoverBox'>
              <Profile src="http://lorempixel.com/80/80/" name="Maria Hamilton" />
            </div>
          </div>
          <div className={this.state.wrapperType ? "col-md-6 bg-success" : "col-md-12 bg-success"}>adios</div>
        </div>
      </Wrapper>
    );
  }
}
