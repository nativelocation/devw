import React, { Component } from "react";

export default class IconInfo extends Component {
    render() {
        const { label, b } = this.props;
        return (
            <button type="button" class="btn btn-secondary" data-container="body" data-toggle="popover" data-placement="bottom" data-content="Vivamussagittis lacus vel augue laoreet rutrum faucibus.">
                Popover on bottom
            </button>

        )
    }
}