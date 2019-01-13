import React, { Fragment } from "react";
import { COLORS } from '../config/constants';
/**
 * The Label Component.
 *
 * @version 1
 * @param  textColor - Color of text, default is gray
 */
const FilterFulltime = ({ }) => {

    return (
        <Fragment>
            <h6 className="font-weight-light pl-2 m-0">Show:</h6>
            <div className="form-check form-check-inline mt-2 ml-2">
                <input
                    style={styles.checkBoxWidth}
                    className="form-check-input mt-1"
                    type="checkbox"
                    id="inlineCheckbox1"
                    value="option1"
                />
                <label
                    className="form-check-label"
                    htmlFor="inlineCheckbox1"
                    style={styles.checkBoxSize}
                >
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
                <label
                    className="form-check-label"
                    htmlFor="inlineCheckbox2"
                    style={{ marginTop: -10, fontSize: 12 }}
                >
                    part-time
            </label>
            </div>
        </Fragment>
    )
}
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
export default FilterFulltime;