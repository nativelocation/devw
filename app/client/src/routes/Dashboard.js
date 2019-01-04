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
    const { account } = this.props;
    console.log('metodo')
    Api.GetProjects(account.tokenAuth).then(res => {
      console.log('Respuesta')
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
