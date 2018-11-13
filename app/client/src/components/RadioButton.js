import React, { Component, Fragment } from "react";

export default class RadioButton extends Component {

    render() {
        const { text, name, id, inline } = this.props;
        return (
            <div className={inline ? "custom-control custom-radio custom-control-inline" : "custom-control custom-radio"}>
                <input type="radio" id={id} name={name} className="custom-control-input" />
                <label className="custom-control-label form-text text-muted" htmlFor={id}>{text}</label>
            </div>
        )
    }
}
