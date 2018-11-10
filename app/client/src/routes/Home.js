import React, { Component, Fragment } from 'react';
import Loading from '../components/Loading';



export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <Loading />
      </Fragment>
    );
  }
}
