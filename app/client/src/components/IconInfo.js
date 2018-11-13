import React, { Component } from "react";

export default class IconInfo extends Component {
    render() {
        const { label, b } = this.props;
        return (
            <button tabindex="0"
                class="btn btn-lg btn-danger"
                role="button"
                data-toggle="popover"
                data-trigger="focus"
                title="Title"
                data-content="Content">
                Dismissible popover
            </button>

        )
    }
}