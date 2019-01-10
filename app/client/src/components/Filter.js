import React, { Component, Fragment } from "react";
import { FONTS } from "../config/constants";
import SelectInput from "./SelectInput";
import Button from "./Button";
import { connect } from "react-redux";
var moment = require("moment");
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
    value: "today",
    dates: []
  };

  onSubmit(e) {
    e.preventDefault();
    let data = {
      fromTime: "00:00",
      toTime: "23:59"
    };

    switch (this.state.value) {
      case "today": {
        const today = moment().format("YYYYMMDD");
        data.fromDate = today;
        data.toDate = today;
        break;
      }
      case "yesterday": {
        const today = moment()
          .subtract(1, "days")
          .format("YYYYMMDD");
        data.fromDate = today;
        data.toDate = today;
        break;
      }
      case "this month": {
        data.fromDate = moment().format("YYYYMM01");
        data.toDate = moment()
          .endOf("month")
          .format("YYYYMMDD");
        break;
      }
      case "last month": {
        data.fromDate = moment()
          .subtract(1, "month")
          .format("YYYYMM01");
        data.toDate = moment()
          .subtract(1, "month")
          .endOf("month")
          .format("YYYYMMDD");
        break;
      }
      case "this week": {
        data.fromDate = moment()
          .startOf("week")
          .format("YYYYMMDD");
        data.toDate = moment()
          .endOf("week")
          .format("YYYYMMDD");
        break;
      }
      case "last week": {
        data.fromDate = moment()
          .subtract(1, "week")
          .startOf("week")
          .format("YYYYMMDD");
        data.toDate = moment()
          .subtract(1, "week")
          .endOf("week")
          .format("YYYYMMDD");
        break;
      }
      case "this year": {
        data.fromDate = moment()
          .startOf("year")
          .format("YYYYMMDD");
        data.toDate = moment()
          .endOf("year")
          .format("YYYYMMDD");
        break;
      }
      case "last year": {
        data.fromDate = moment()
          .subtract(1, "year")
          .startOf("year")
          .format("YYYYMMDD");
          data.toDate = moment()
          .subtract(1, "year")
          .endOf("year")
          .format("YYYYMMDD");
        break;
      }
      default: {
        data = {};
        break;
      }
    }

    const { onSubmit } = this.props;
    if (onSubmit) onSubmit(data);
  }

  onChange(e) {
    this.setState({ value: e.target.value });
  }

  clearTime = (e) => {
    e.target.value = 'today';
    let data = {
      fromTime: "00:00",
      toTime: "23:59"
    };
    const today = moment().format("YYYYMMDD");
    data.fromDate = today;
    data.toDate = today;
    const { onSubmit } = this.props;
    if (onSubmit) onSubmit(data);
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
              onClick={this.clearTime.bind(this)}
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
