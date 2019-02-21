import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { ToastContainer, ToastStore } from "react-toasts";
import Api from "../config/api";
import Wrapper from "../components/Wrapper";
import Sidebar from "../components/Sidebar";
import Loading from '../components/Loading';


class DailyGoals extends Component {
  state = {
    people: [],
    developers: [],
    active: {},
    isGoing: false,
    process: 0,
    loading: false
  };

  async componentWillMount() {
    // this.allDeveloper()
  }

  async allDeveloper() {
    const { account } = this.props;
    this.setState({ loading: true })
    const resPeople = await Api.GetPeople(account.tokenAuth);
    const resDeveloper = await Api.GetAllDeveloper(account.tokenAuth);
    this.setState({ people: resPeople, developers: resDeveloper, loading: false });
  }

  onLogout() {
    localStorage.removeItem("tokenAuth");
    window.location.reload();
  }



  render() {
    const loading = this.state.loading;
    return (

      <Fragment>
        <Sidebar />
        <Wrapper title="Daily Goals" onClick={this.onLogout} hideLink>
          <div className='bg-info h-100'>Tabla</div>
          <div className='bg-success'>Input</div>
          <Loading
            show={loading}
            absolute
            backgroundClass="bg-gray"
            textColor="#020202"
            text="LOADING.."
          />
        </Wrapper>
      </Fragment>
    );
  }
}

export default connect(s => ({ account: s.account }))(DailyGoals);
