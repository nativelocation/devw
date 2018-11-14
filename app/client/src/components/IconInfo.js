import React, { Component } from "react";

export default class IconInfo extends Component {
    render() {
        const { icon } = this.props;
        const text = 'The Athlete has not yet confirmed his account <br/>This Athlete has unsigned Contracts';
        return (

            <i className={icon}
                tabIndex="0"
                role="button"
                data-toggle="popover"
                data-trigger="focus"
                data-placement="bottom"
                title="Title"
                data-content={text}></i>
        )
    }
}