import React, { Component, Fragment } from "react";

export default class RadioButton extends Component {

    render() {
        const { text, name, id, inline } = this.props;
        return (
            <div class={inline ? "custom-control custom-radio custom-control-inline" : "custom-control custom-radio"}>
                <input type="radio" id={id} name={name} class="custom-control-input" />
                <label class="custom-control-label form-text text-muted" for={id}>{text}</label>
            </div>
        )
    }
}
