import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Api from "../config/api";
import Wrapper from "../components/Wrapper";
import Sidebar from "../components/Sidebar";

const month = new Array();
month[0] = "01";
month[1] = "02";
month[2] = "03";
month[3] = "04";
month[4] = "05";
month[5] = "06";
month[6] = "07";
month[7] = "08";
month[8] = "09";
month[9] = "10";
month[10] = "11";
month[11] = "12";

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
    const d = new Date();
    const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    const mon = month[d.getMonth()];
    const year = d.getFullYear();
    const today = `${year}${mon}${day}`;
    
    let data = {
      fromDate: today,
      toDate: today,
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
      <Fragment>
        <Sidebar onSubmit={(r) => console.log(r)} projects={projects} people={people}/>
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
      </Fragment>
    );
  }
}
export default connect(s => ({ account: s.account }))(Dashboard);
