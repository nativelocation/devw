import React, { Component } from "react";
import { connect } from "react-redux";
import Api from "../config/api";
import UnderConstruction from "../components/UnderConstruction";

class Dashboard extends Component {
  state = {
    projects: [],
    people: []
  };

  componentWillMount() {
    this.getProjects();
    this.getPeople();
  }

  getProjects = () => {
    const { account } = this.props;
    Api.GetProjects(account.tokenAuth)
      .then(res => {
        console.log("Project");
        const response = res.data;
        this.setState({ projects: response.projects });
      })
      .catch(err => {
        console.error(err);
      });
  };

  getPeople = () => {
    const { account } = this.props;
    Api.GetPeople(account.tokenAuth)
      .then(res => {
        console.log("PEOPLE ");
        const response = res.data;
        this.setState({ people: response.people });
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    const { projects, people } = this.state;
    let projectsName = projects.map((r, i) => {
      return <th key={i}>{r.name}</th>;
    });
    let peoplesName = people.map((r, i) => {
      return (
        <tr key={i} className="">
          <td className="col-md-2 border-0">
            {r["first-name"]} {r["last-name"]}
          </td>
        </tr>
      );
    });
    return (
      <div className="d-flex flex-row">
        <table className="table" style={{marginTop: 75}}>
          <tbody>{peoplesName}</tbody>
        </table>
        <table className="table">
          <thead>
            <tr>{projectsName}</tr>
          </thead>
          <tbody>
            <tr>
              <td>dd</td>
              <td>dd</td>
              <td>dd</td>
              <td>dd</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default connect(s => ({ account: s.account }))(Dashboard);
