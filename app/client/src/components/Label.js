import React, { Component, Fragment } from "react";
/**
 * The Label Component.
 *
 * @version 1.0.1
 * @param  label - Text of the label
 * @param  b - Set text to bold
 * @param  labelClass - Add class bootstrap to the label
 */
export default class Label extends Component {
    render() {
        const { label, b, labelClass } = this.props;
        return (
            <Fragment>
                {label ? <label className={labelClass ? labelClass : undefined}><small className={b ? "form-text text-muted font-weight-bold" : "form-text text-muted"}>{label}</small></label> : null}
            </Fragment>
        )
    }
}