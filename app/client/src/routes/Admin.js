import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Api from "../config/api";
import Wrapper from "../components/Wrapper";
import Sidebar from "../components/Sidebar";

class Admin extends Component {
  state = {
    projects: [],
    people: [],
    times: [],
  };

  async componentWillMount() {
    const { account } = this.props;
    const resProj = await Api.GetProjects(account.tokenAuth);
    const resPeople = await Api.GetPeople(account.tokenAuth);

    this.setState({ people: resPeople });
  }

  onLogout() {
    localStorage.removeItem("tokenAuth");
    window.location.reload();
  }

  render() {
    const { people } = this.state;

    if (people.data) {
      let ppl = people.data.people
      console.log("PP", ppl["first-name"])
      var peopleList = ppl.map((r, i) => {
        console.log("P", r["first-name"])
        return (
          <p>{r["first-name"]}</p>

        );
      });
    }



    return (

      <Fragment>
        <Sidebar admin='admin' />
        <Wrapper name="Show:" onClick={this.onLogout}>
          <div className="d-flex flex-row">
            <p>Admin</p>
            {peopleList}
          </div>
          <div className="d-flex flex-row table-responsive tableProjects">
            <table className="table table-striped table-hover table-borderless">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Active</th>
                  <th>Full-Time</th>
                </tr>
              </thead>
              <tbody>

              </tbody>
            </table>
          </div>
        </Wrapper>
      </Fragment>
    );
  }
}
export default connect(s => ({ account: s.account }))(Admin);
