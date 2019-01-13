import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import moment from 'moment';
import Api from "../config/api";
import Wrapper from "../components/Wrapper";
import Sidebar from "../components/Sidebar";
import Loading from '../components/Loading';

class Dashboard extends Component {
  state = {
    projects: [],
    people: [],
    times: [],
    process: 0,
    loading: true
  };

  totalProjects = {};
  totalPeople = {};
  componentWillMount() {
    this.onStart();
  }

  async onStart() {
    const { account } = this.props;
    const resProj = await Api.GetProjects(account.tokenAuth);
    const resPeople = await Api.GetPeople(account.tokenAuth);
    const today = moment().format("YYYYMMDD");

    if (resProj && resProj.data && resPeople && resPeople.data) {
      this.totalProjects = resProj.data.projects;
      this.totalPeople = resPeople.data.people;

      this.getTimeByUser({
        fromTime: "00:00",
        toTime: "23:59",
        fromDate: today,
        toDate: today
      });
    } else console.log("Error getting data");
  }

  onLogout() {
    localStorage.removeItem("tokenAuth");
    window.location.reload();
  }

  async getTimeByUser(data) {
    const { account } = this.props;
    const people = this.totalPeople;
    let times = [];
    let projects = [];
    console.log('===== START =====', data)

    let counter = 0;
    this.setState({ process: 0, loading: true });
    await Promise.all(this.totalPeople.map(async pp => {
      data.userId = pp.id;
      const res = await Api.GetTotalTimeByDate(account.tokenAuth, data);
      if (res.data) {
        times[pp.id] = res.data.projects.map(v => ({
          id: v.id,
          time: v.totalHours
        }));

        counter++;
        let process = ((counter * 100) / this.totalPeople.length).toFixed(0);
        if (process < 100) this.setState({ process });
      }
    }));
    this.totalProjects.map(pj => {
      let total = 0;
      times.map(v => {
        let proj = v.find(p => p.id === pj.id);
        if (proj) total += parseFloat(proj.time);
      });
      pj.totalHours = total.toFixed(2);
      if (total > 0) projects.push(pj);
    });

    this.setState({ projects, people, times, loading: false });
  }

  render() {
    const { projects, people, times, loading, process } = this.state;

    const peoplesName = people.map((pp, i) => {
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

    const projectsName = projects.map((r, i) => <th key={i} className="text-center peopleName">{r.name}</th>);
    const totalProjects = projects.map((pj, i) => <td key={i} className="border-right text-center"> {pj.totalHours}</td>);
    let totalOfTotals = 0;
    projects.map((pj, i) => totalOfTotals += parseFloat(pj.totalHours));

    return (
      <Fragment>
        <Sidebar onSubmit={r => this.getTimeByUser(r)} />
        <Wrapper name="Show:" onClick={this.onLogout}>
          {!loading ?
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
                    <td className="border-right peopleName"><b>TOTAL</b></td>
                    {totalProjects}
                    <td className="border-right text-center"><b>{totalOfTotals.toFixed(2)}</b></td>
                  </tr>
                </tbody>
              </table>
            </div>
            : <Loading show text={`LOADING: ${process}%`} />}
        </Wrapper>
      </Fragment >
    );
  }
}
export default connect(s => ({ account: s.account }))(Dashboard);
