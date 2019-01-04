import React, { Component } from "react";
import { connect } from 'react-redux';
import Api from '../config/api';
import UnderConstruction from '../components/UnderConstruction';

class Dashboard extends Component {
  state = {
    projects: []
  };

  componentWillMount(){
      this.getProjects();
  }

  getProjects = () => {
    Api.GetProjects().then(res => {
        console.log(res);
    }).catch(err => {
        console.error(err);
    })
  }

  render() {
    return (<UnderConstruction />);
  }
}
export default connect(s => ({ account: s.account }))(Dashboard)
