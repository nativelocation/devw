import React, { Component, Fragment } from "react";

export default class Label extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { label, b } = this.props;
        return (
            <Fragment>
                {label ? <label><small class={b ? "form-text text-muted font-weight-bold" : "form-text text-muted"}>{label}</small></label> : null}
            </Fragment>
        )
    }
}

const styles = {
    file: {

    }
}


