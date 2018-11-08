import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import SideBar from '../components/Sidebar';
import Breadcrumb from '../components/Breadcrumb';


export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Navbar />
        <SideBar />
        <Breadcrumb name='Athletes and Agents' />
      </div>
    );
  }
}
