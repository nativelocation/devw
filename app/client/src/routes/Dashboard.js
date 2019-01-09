import React, { Component } from "react";
import { connect } from "react-redux";
import Api from "../config/api";
import Wrapper from "../components/Wrapper";

class Dashboard extends Component {
  state = {
    projects: [],
    people: [],
    times: []
  };

  async componentWillMount() {
    const { account } = this.props;
    const resProj = await Api.GetProjects(account.tokenAuth);
    const resPeople = await Api.GetPeople(account.tokenAuth);
    if (resProj && resProj.data && resPeople && resPeople.data)
      this.getTimeByUser(resProj.data.projects, resPeople.data.people);
    else console.log("Error getting data");
  }

  onLogout() {
    localStorage.removeItem("tokenAuth");
    window.location.reload();
  }

  getTimeByUser = async (projects, people) => {
    const { account } = this.props;
    let data = {
      fromDate: "20180101",
      toDate: "20181231",
      fromTime: "00:00",
      toTime: "23:59"
    };

    people.forEach(pp => {
      data.userId = pp.id;

      Api.GetTotalTimeByDate(account.tokenAuth, data)
        .then(res => {
          if (res.data) {
            this.setState(oldState => {
              let { times } = oldState;
              times[pp.id] = res.data.projects.map(v => ({
                id: v.id,
                time: v.totalHours
              }));
              return { times };
            });
          }
        })
        .catch(err => {
          console.error(err);
        });
    });

    this.setState({ projects, people });
  };

  render() {
    const { projects, people, times } = this.state;
    let projectsName = projects.map((r, i) => {
      return (
        <th key={i} className="text-center peopleName">
          {r.name}
        </th>
      );
    });
    let peoplesName = people.map((pp, i) => {
      const getTime = id => {
        if (times[pp.id] && times[pp.id].length > 0) {
          const p = times[pp.id].find(v => v.id === id);
          if (p) return p.time;
          else return "-";
        }
        return "-";
      };

      const getTotalPeople = () => {
        if (times[pp.id] && times[pp.id].length > 0) {
          let total = 0;
          times[pp.id].map(v => {
            total += parseFloat(v.time);
          });
          return total.toFixed(2);
        }
        return "-";
      };

      return (
        <tr key={i} className="">
          <td className="border-right peopleName">
            {pp["first-name"]} {pp["last-name"]}
          </td>
          {projects.map((pj, ii) => (
            <td key={ii} className="border-right text-center">
              {getTime(pj.id)}
            </td>
          ))}
          <td className="text-center">{getTotalPeople()}</td>
        </tr>
      );
    });
    let totalProjects = projects.map((pj, i) => {
      let total = 0;
      times.map(v => {
        let proj = v.find(p => p.id === pj.id);
        if (proj) total += parseFloat(proj.time);
      });
      return (
        <td key={i} className="border-right text-center">
          {total.toFixed(2)}
        </td>
      );
    });
    return (
      <Wrapper name="Show:" onClick={this.onLogout}>
        <div className="d-flex flex-row table-responsive tableProjects">
          <table className="table table-striped table-hover table-borderless">
            <thead>
              <tr>
                <th />
                {projectsName}
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {peoplesName}
              <tr>
                <td className="border-right peopleName">TOTAL</td>
                {totalProjects}
                <td />
              </tr>
            </tbody>
          </table>
        </div>
      </Wrapper>
    );
  }
}
export default connect(s => ({ account: s.account }))(Dashboard);
