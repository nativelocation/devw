import React, { Component } from "react";
import { connect } from "react-redux";
import Api from "../config/api";
import UnderConstruction from "../components/UnderConstruction";
import Wrapper from "../components/Wrapper";

class Dashboard extends Component {
  state = {
    projects: [],
    people: [],
    times: [],
  };

  componentDidMount() {
    this.getProjects();
    this.getPeople();
    this.getTimeByUser();
  }

  getProjects = () => {
    const { account } = this.props;
    Api.GetProjects(account.tokenAuth)
      .then(res => {
        console.log("Project", res);
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
        console.log("PEOPLE ", res);
        const response = res.data;
        this.setState({ people: response.people });
      })
      .catch(err => {
        console.error(err);
      });
  };

  getTimeByUser = () => {
    const { account } = this.props;
    const { projects, people } = this.state;
    // project = 307267 | 302263
    // user = 143938 | 165366
    projects.map((r, i) => {
      people.map((value, index) => {
        let data = {
          projectId: r.id,
          userId: value.id
        }
        Api.GetTimeByUser(account.tokenAuth, data)
          .then(res => {
            console.log("Time ", res);
            // const response = res.data;
            // this.setState({ times: response.people });
          })
          .catch(err => {
            console.error(err);
          });
      })
    })
    // return times;
  };

  render() {
    const { projects, people } = this.state;
    let projectsName = projects.map((r, i) => {
      return <th key={i} className='text-center peopleName'>{r.name}</th>;
    });
    let peoplesName = people.map((r, i) => {
      return (
        <tr key={i} className="">
          <td className='border-right peopleName'>
            {r["first-name"]} {r["last-name"]}
          </td>
          {projects.map((r, i) => (
            <td className='border-right text-center'>2</td>
          ))}
          <td className='text-center'>50</td>
        </tr>
      );
    });
    return (
      <Wrapper name='Show:'>
        <div className="d-flex flex-row table-responsive tableProjects">
          <table className="table table-striped table-hover table-borderless">
            <thead>
              <tr>
                <th />
                {projectsName}
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>{peoplesName}</tbody>
          </table>
        </div>
      </Wrapper>
    );
  }
}
export default connect(s => ({ account: s.account }))(Dashboard);
