import React, { Component, Fragment } from "react";
import { FONTS } from "../config/constants";
import SelectInputGoals from "./SelectInputGoals";
import Button from "./Button";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

var moment = require("moment");

class Collapse extends Component {
  state = {
    custom: new Date(),
    dates: [],
    showCustom: false
  };

  onSubmit(e, value) {
    if (e) e.preventDefault();
    const { custom } = this.state;
    let taskDateFormat = "";

    switch (value.toLowerCase()) {
      case "yesterday": {
        taskDateFormat = moment().subtract(1, "days").format("YYYYMMDD");
        break;
      }
      case "today": {
        taskDateFormat = moment().format("YYYYMMDD");
        break;
      }
      case "tomorrow": {
        taskDateFormat = moment().add(1, "days").format("YYYYMMDD");
        break;
      }
      case "monday": {
        taskDateFormat = moment().startOf('isoWeek').add(1, 'week').format("YYYYMMDD");
        break;
      }
      case "custom": {
        taskDateFormat = moment(custom).format("YYYYMMDD");
        break;
      }
    }

    const { onSubmit } = this.props;
    if (onSubmit) onSubmit(taskDateFormat);
  }

  onChange(e) {
    let showCustom = false;
    if (e.target.value.toLowerCase() === "custom") showCustom = true;
    else this.onSubmit(undefined, e.target.value);

    const { onSelectChange } = this.props;
    if (onSelectChange) onSelectChange(e.target.value);

    this.setState({ showCustom });
  }

  clearTime = e => {
    this.setState({ value: "today", showCustom: false });
    const today = moment().format("YYYYMMDD");
    const { onSubmit } = this.props;
    if (onSubmit) onSubmit(today);
  };

  onCustomChange(custom) {
    this.setState({ custom });
  }

  render() {
    const { custom, showCustom } = this.state;
    const { selectValue, onCustomChange } = this.props;
    let showInput = showCustom ? (
      <Fragment>
        <div className="d-flex flex-column">
          <div style={styles.calendarOne}>
            <i className="fa fa-calendar-day text-white" aria-hidden="true" />
          </div>
          <small className="form-text text-white">Custom Date:</small>
          <DatePicker style={styles.datepicker} selected={custom} onChange={this.onCustomChange.bind(this)} />
        </div>
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
    ) : undefined;
    return (
      <form onSubmit={e => this.onSubmit(e, selectValue)}>
        <p className="text-white ml-2 mb-0" style={styles.titleDate}>
          Filter by:
          </p>
        <div className="col-md-12 col-lg-12 d-flex">
          <SelectInputGoals onChange={this.onChange.bind(this)} value={selectValue} isForSideBar />
        </div>

        <div className="col-md-12 d-flex flex-column">
          {showInput}
        </div>
      </form>
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
    width: '20px',
    height: '100%',
    position: "relative",
    zIndex: 1
  },
  datepicker: {
    zIndex: 2
  }
};

export default connect(s => ({ account: s.account }))(Collapse);
