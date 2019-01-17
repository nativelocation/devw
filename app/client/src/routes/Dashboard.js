import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import moment from 'moment';
import Api from "../config/api";
import Wrapper from "../components/Wrapper";
import Sidebar from "../components/Sidebar";
import Loading from '../components/Loading';
import FilterFulltime from "../components/FilterFulltime";

class Dashboard extends Component {
  state = {
    projects: [],
    people: [],
    times: [],
    process: 0,
    loading: true,
    showPassword: false
  };

  tableRef = React.createRef();
  totalProjects = [];
  totalPeople = [];

  componentWillMount() {
    this.onStart();
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  async onStart() {
    const { account } = this.props;
    const resProj = await Api.GetProjects(account.tokenAuth);
    const resPeople = await Api.GetPeople(account.tokenAuth);
    const resDevs = await Api.GetAllDeveloper(account.tokenAuth);

    const today = moment().format("YYYYMMDD");

    if (resProj && resProj.data && resPeople && resPeople.data) {
      this.totalProjects = resProj.data.projects;

      if (resDevs.status === 201) {
        resPeople.data.people.map(pp => {
          const find = resDevs.data.find(d => pp.id === d.apiId);
          if (find && find.active) {
            pp.isFullTime = find.fullTime;
            this.totalPeople.push(pp);
          }
        });
      } else this.totalPeople = resPeople.data.people;

      this.getTimeByUser({
        fromTime: "00:00",
        toTime: "23:59",
        fromDate: today,
        toDate: today
      });
    } else console.log("Error getting data");
  }

  async getTimeByUser(data) {
    const { account } = this.props;
    const people = this.totalPeople;
    let times = [];
    let projects = [];

    let counter = 0;
    this.setState({ process: 0, loading: true });
    await Promise.all(this.totalPeople.map(async pp => {
      data.userId = pp.id;
      const res = await Api.GetTotalTimeByDate(account.tokenAuth, data);
      if (res.data && res.data.projects && res.data.projects.length > 0) {
        times[pp.id] = res.data.projects.map(v => ({
          id: v.id,
          time: v.totalHours
        }));
      }

      counter++;
      let process = ((counter * 100) / this.totalPeople.length).toFixed(0);
      if (process < 100) this.setState({ process });
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

  changePass() {
    this.setState({ showPassword: true })
  }

  handleDevs(type) {
    let people = [];
    this.totalPeople.map(pp => {
      switch (type) {
        case '1': if (pp.isFullTime) people.push(pp); break;
        case '2': if (!pp.isFullTime) people.push(pp); break;
        default: people.push(pp);
      }
    });

    this.setState({ people });
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

      let totalTimePeople = 0;
      let textColor = '';
      if (times[pp.id] && times[pp.id].length > 0) {
        let total = 0;
        times[pp.id].map(v => {
          total += parseFloat(v.time);
        });
        totalTimePeople = total.toFixed(2);
        if (pp.isFullTime) textColor = 'text-info';
      }
      if (totalTimePeople === 0) textColor = 'text-danger';

      return (
        <tr key={i} className="">
          <td className={`border-right peopleName ${textColor}`} style={styles.sizeRow} >
            {pp["first-name"]} {pp["last-name"]}
          </td>
          {projects.map((pj, ii) => (
            <td key={ii} className="border-right text-center" style={styles.sizeRow} >
              {getTime(pj.id)}
            </td>
          ))}
          <td className="text-center" style={styles.sizeRow} >{totalTimePeople === 0 ? '-' : totalTimePeople}</td>
        </tr>
      );
    });

    const projectsName = projects.map((r, i) => <th key={i} className="text-center" style={styles.sizeRow}>{r.name}</th>);
    const totalProjects = projects.map((pj, i) => <td key={i} className="border-right text-center" style={styles.sizeRow} > {pj.totalHours}</td>);
    let totalOfTotals = 0;
    projects.map((pj, i) => totalOfTotals += parseFloat(pj.totalHours));
    const { account } = this.props;
    const hideAdmin = account.role === 2 ? 'hideLink' : undefined
    return (
      <Fragment>
        <Sidebar onSubmit={r => this.getTimeByUser(r)} changePass={() => this.changePass.bind(this)} />
        <Wrapper hideLink={hideAdmin} showPassword>
          {!loading ?
            projects.length > 0 ?
              <Fragment>
                <FilterFulltime onChange={this.handleDevs.bind(this)} />
                <div className="d-flex flex-row" style={{ flex: 1 }}>
                  <table ref="table" className="table table-striped table-hover table-borderless d-flex flex-column" style={{ overflowX: "scroll" }}>
                    <thead>
                      <tr>
                        <th style={styles.sizeRow}>
                        </th>
                        {projectsName}
                        <th style={styles.sizeRow} className="text-center" >TOTAL</th>
                      </tr>
                    </thead>
                    <tbody style={{ overflowY: "scroll", overflowX: 'hidden', width: 'max-content' }}>
                      {peoplesName}
                      <tr>
                        <td className="border-right text-center" style={styles.sizeRow} ><b>TOTAL</b></td>
                        {totalProjects}
                        <td className="border-right text-center" style={styles.sizeRow} ><b>{totalOfTotals.toFixed(2)}</b></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Fragment> :
              <div className={"h-100 d-flex align-items-center justify-content-center text-center"}>
                <h1 className="font-weight-light pl-2 m-0">Uh-oh, seems like there aren't hours logged for this period time</h1>
              </div>
            : <Loading show text={`LOADING: ${process}%`} />}
        </Wrapper>
      </Fragment >
    );
  }
}

const styles = {
  sizeRow: {
    minWidth: '200px'
  }
}
export default connect(s => ({ account: s.account }))(Dashboard);
