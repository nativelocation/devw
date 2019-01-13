import React, { Component, Fragment } from "react";
import { FONTS } from "../config/constants";
import SelectInput from "./SelectInput";
import Button from "./Button";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

var moment = require("moment");

class Collapse extends Component {
  state = {
    value: "today",
    from: new Date(),
    to: new Date(),
    dates: [],
    showCustom: false
  };

  onSubmit(e) {
    e.preventDefault();
    let data = {
      fromTime: "00:00",
      toTime: "23:59"
    };
    console.log("Select", this.state.value);
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
        data.fromDate = moment(this.state.from).format("YYYYMMDD");
        data.toDate = moment(this.state.to).format("YYYYMMDD");
        break;
      }
    }

    const { onSubmit } = this.props;
    if (onSubmit) onSubmit(data);
  }

  onChange(e) {
    this.setState({ value: e.target.value, showCustom: false });
    if (e.target.value === "custom") this.setState({ showCustom: true });
  }

  clearTime = e => {
    this.setState({ value: "today", showCustom: false });
    let data = {
      fromTime: "00:00",
      toTime: "23:59"
    };
    const today = moment().format("YYYYMMDD");
    data.fromDate = today;
    data.toDate = today;
    const { onSubmit } = this.props;
    if (onSubmit) onSubmit(data);
  };

  fromChange(date) {
    this.setState({ from: date });
  }

  toChange(date) {
    this.setState({ to: date });
  }

  render() {
    const { from, to, showCustom, value } = this.state;
    console.log("Render ", value);
    let showInput = showCustom ? (
      <Fragment>
        <div className="col-md-7 d-flex flex-column">
          <small className="form-text text-white">From</small>
          <DatePicker selected={from} onChange={this.fromChange.bind(this)} />
        </div>
        <div className="col-md-7 d-flex flex-column">
          <small className="form-text text-white">To</small>
          <DatePicker selected={to} onChange={this.toChange.bind(this)} />
        </div>
      </Fragment>
    ) : (
      undefined
    );
    return (
      <Fragment>
        <form onSubmit={this.onSubmit.bind(this)}>
          <p className="text-white ml-2" style={styles.titleDate}>
            Dates:
          </p>
          <div className="col-md-7 d-flex align-items-center ml-2">
            <SelectInput onChange={this.onChange.bind(this)} value={value} />
          </div>
          <div className="col-md-7 d-flex flex-column justify-content-center ml-1 mt-3">
            {showInput}
          </div>
          <hr />
          <div className="d-flex flex-row ml-4 ">
            <Button text="Apply" filter />
            <button
              type="button"
              className="btn btn-link text-white nounderline ml-3"
              onClick={this.clearTime.bind(this)}
              style={{ fontSize: 13 }}
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
