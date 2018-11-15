import React, { Component } from "react";
/**
 * The Profile input Component.
 *
 * @version 1.0.1
 * @param  src - Add image path
 * @param  w - Add new width to the image
 */
export default class ProfileInput extends Component {
    render() {
        const { src, w } = this.props;
        return (
            <div className="text-center">
                <img src={src} className="rounded-circle" style={{width:w ? parseInt(w) : undefined }} />
            </div>
        )
    }
}