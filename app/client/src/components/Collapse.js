import React, { Component, Fragment } from "react";
import { FONTS } from "../config/constants";
import SelectInput from './SelectInput';

export default class Collapse extends Component {
  render() {
    return (
      <Fragment>
        <p className="text-white ml-2" style={styles.titleDate}>
          Dates:
        </p>
        <div className="col-md-7 d-flex align-items-center ml-2">
          <SelectInput />
        </div>
        <hr />
        <p className="text-white ml-2" style={styles.titleDate}>
          Projects:
        </p>
        <hr />
        <p className="text-white ml-2" style={styles.titleDate}>
          Developers:
        </p>
        <hr />
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
