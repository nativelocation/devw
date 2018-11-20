import React, { Component } from "react";
/**
 * The Profile input Component.
 *
 * @version 1.0.2
 * @param  src - Add image path
 * @param  width - Add new width to the image
 */

export default class ProfileImage extends Component {

    state = {
        error: false
    }

    handlError = (e) => {
        console.log('target', e.target.src);
        this.setState({ error: true });
    }

    render() {
        const { src, width } = this.props;
        const { error } = this.state;
        return (
            <div className="text-center">
                <img src={!error ? src : undefined} className="border rounded-circle m-1 border-dark" style={{ width: width ? parseInt(width) : 60, padding: error || !src ? 29 : src, backgroundColor: '#DDD' }} onError={this.handlError.bind(this)} />
            </div>
        )
    }

}