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

  onSubmit(e, value) {
    if (e) e.preventDefault();
    let data = {
      fromTime: "00:00",
      toTime: "23:59"
    };

    switch (value.toLowerCase()) {
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
    let showCustom = false;
    if (e.target.value.toLowerCase() === "custom") showCustom = true;
    else this.onSubmit(undefined, e.target.value);

    this.setState({ value: e.target.value, showCustom });
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
    let showInput = showCustom ? (
      <Fragment>
        <div className="d-flex flex-column">
          <div>
            <i
              className="fa fa-calendar-day text-white"
              aria-hidden="true"
              style={styles.calendarOne}
            />
          </div>
          <small className="form-text text-white">From</small>
          <DatePicker selected={from} onChange={this.fromChange.bind(this)} />
        </div>
        <div className="d-flex flex-column mb-5">
          <i
            className="fa fa-calendar-day text-white calendarFrom"
            aria-hidden="true"
            style={styles.calendarOne}
          />
          <small className="form-text text-white pt-2">To</small>
          <DatePicker selected={to} onChange={this.toChange.bind(this)} />
        </div>
      </Fragment>
    ) : undefined;
    let showButton = showCustom ? (
      <Fragment>
        <hr className="mx-0" />
        <div className="d-flex flex-row">
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
      </Fragment>
    ) : (
        undefined
      );
    return (
      <Fragment>
        <form onSubmit={e => this.onSubmit(e, value)}>
          <p className="text-white ml-2 mb-0" style={styles.titleDate}>
            Dates:
          </p>
          <div className="col-md-12 col-lg-12 d-flex">
            <SelectInput onChange={this.onChange.bind(this)} value={value} />
          </div>

          {/* <div className="col-md-7 d-flex align-items-center ml-2">
            <div className="d-flex flex-column col-md-12 border border-light text-white">
              <a
                className="pt-2 nounderline text-white"
                href="#filter"
                data-toggle="collapse"
                aria-expanded="false"
              >
                Today
                <span>
                  <i className="fa fa-angle-down float-right pt-1" />
                </span>
              </a>
              <div id="filter" className=" collapse">
                <ul value={value}>
                  <li>
                    <a href='#javascript:;' className="pt-1">today</a>
                  </li>
                  <li>
                    <a className="pt-1">yesterday</a>
                  </li>
                  <li>
                    <a className="pt-1">this month</a>
                  </li>
                  <li>
                    <a className="pt-1">last month</a>
                  </li>
                  <li>
                    <a className="pt-1">this year</a>
                  </li>
                  <li>
                    <a className="">last year</a>
                  </li>
                  <hr />
                  <li>
                    <a className="pb-2">custom</a>
                  </li>
                </ul>
              </div>
            </div>
          </div> */}

          <div className="col-md-12 d-flex flex-column">
            {showInput}
            {showButton}
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
  },
  calendarOne: {
    top: 55,
    left: 10,
    position: "relative",
    zIndex: 2
  }
};

export default connect(s => ({ account: s.account }))(Collapse);
