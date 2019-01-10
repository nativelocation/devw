import React, { Component, Fragment } from "react";
import { FONTS } from "../config/constants";
import SelectInput from "./SelectInput";
import Button from "./Button";
import { connect } from "react-redux";
var moment = require('moment-timezone');
moment().tz('America/Phoenix').format();

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

class Collapse extends Component {
  state = {
    value: "today" || ""
  };

  onSubmit(e) {
    e.preventDefault();
    // console.log("State ", );
    const d = new Date();
    let date = undefined;
    let day = undefined;
    let mon = undefined;
    let year = undefined;
    // switch (this.state.value) {
    //   case "today":
    //     day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    //     mon = month[d.getMonth()];
    //     year = d.getFullYear();
    //     date = `${year}${mon}${day}`;
    //     break;
    //   case "yesterday":
    //     // const yes = d.getDate() - 1;
    //     day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    //     mon = month[d.getMonth()];
    //     year = d.getFullYear();
    //     date = `${year}${mon}${day}`;
    //     break;

    //   default:
    //     break;
    // }

    switch (this.state.value) {
      case 'today': {
        const today = moment().format("YYYYMMDD");
        data.fromDate = today;
        data.toDate = today;
      }
      case 'yesterday': {
        const today = moment().subtract(1, 'days').format("YYYYMMDD");
        data.fromDate = today;
        data.toDate = today;
      }
      case 'this month': {
        data.fromDate = moment().format("YYYYMM01");
        data.toDate = moment().endOf('month').format("YYYYMMDD");
      }
      case 'last month': {
        data.fromDate = moment().subtract(1, 'month').format("YYYYMM01");
        data.toDate = moment().subtract(1, 'month').endOf('month').format("YYYYMMDD");
      }
      case 'this week': {
        data.fromDate = moment().startOf('week').format("YYYYMMDD");
        data.toDate = moment().endOf('week').format("YYYYMMDD");
      }
      case 'last week': {
        data.fromDate = moment().subtract(1, 'week').startOf('week').format("YYYYMMDD");
        data.toDate = moment().subtract(1, 'week').endOf('week').format("YYYYMMDD");
      }
      case 'this year': {
        data.fromDate = moment().endOf('year').format("YYYYMMDD");
        data.toDate = moment().startOf('year').format("YYYYMMDD");
      }
      case 'last year': {
        data.fromDate = moment().subtract(1, 'year').endOf('year').format("YYYYMMDD");
        data.toDate = moment().subtract(1, 'year').startOf('year').format("YYYYMMDD");
      }
      default: {
        data = {};
      }
    }

    const { onSubmit } = this.props;
    const lol = moment().subtract(1, 'day');
    
    if (onSubmit) onSubmit(moment(lol).get('date'));
  }

  onChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    const { projects, people } = this.props;

    return (
      <Fragment>
        <form onSubmit={this.onSubmit.bind(this)}>
          <p className="text-white ml-2" style={styles.titleDate}>
            Dates:
          </p>
          <div className="col-md-7 d-flex align-items-center ml-2">
            <SelectInput
              onChange={this.onChange.bind(this)}
              value={this.state.value}
            />
          </div>
          <hr />
          <div className="d-flex flex-row ml-2">
            <Button text="Apply" bigSize />
            <button
              type="button"
              className="btn btn-link text-white nounderline"
            >
              Clear
            </button>
          </div>
        </form>
      </Fragment>
    );
  }
}

const styles = {
  titleDate: {
    fontFamily: FONTS.RobotoLight,
    fontSize: 14,
    paddingLeft: 10
  }
};

export default connect(s => ({ account: s.account }))(Collapse);
