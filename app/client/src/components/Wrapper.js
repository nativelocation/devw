import React, { Fragment } from "react";

/**
 * The Wrapper Component.
 *
 * @version 1.0.1
 * @param  name - Add title
 * @param  children - Add more components
 */

const Wrapper = ({ children, name, onClick }) => {
  return (
    <Fragment>
      <div
        id="scrollWrapper"
        className="col-md-12 col-lg-12 p-3"
        style={styles.flex}
      >
        <div className="col-md-12 col-lg-12 m-0">
          <h6 className="font-weight-light pl-2 m-0">{name}</h6>
          <button className="dropdown-item" onClick={onClick}>Loguot</button>
          <div className="form-check form-check-inline mt-2 ml-2">
            <input
            style={styles.checkBoxWidth}
              className="form-check-input mt-1"
              type="checkbox"
              id="inlineCheckbox1"
              value="option1"
            />
            <label className="form-check-label" htmlFor="inlineCheckbox1" style={styles.checkBoxSize}>
              full-time
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
            style={styles.checkBoxWidth}
              className="form-check-input mb-1"
              type="checkbox"
              id="inlineCheckbox2"
              value="option2"
            />
            <label className="form-check-label" htmlFor="inlineCheckbox2" style={{marginTop: -10, fontSize: 12 }}>
              part-time
            </label>
          </div>
        </div>
        <div className="col-md-12 col-lg-12 bg-white p-2">{children}</div>
      </div>
    </Fragment>
  );
};

const styles = {
  flex: {
    flex: 1
  },
  checkBoxWidth: {
    width: 10
  },
  checkBoxSize: {
      fontSize: 12
  }
};

export default Wrapper;
