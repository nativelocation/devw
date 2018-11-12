import React, { Component, Fragment } from "react";
import { COLORS, FONTS } from '../config/constants';

export default class RadioButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { text, name, id, inline } = this.props;
        return (
            <Fragment>
                <div class={inline ? "custom-control custom-radio custom-control-inline" : "custom-control custom-radio" }>
                    <input type="radio" id={id} name={name} class="custom-control-input" />
                    <label class="custom-control-label form-text text-muted" for={id}>{text}</label>
                </div>
            </Fragment>
        )
    }
}

const styles = {
    file: {

    }
}


