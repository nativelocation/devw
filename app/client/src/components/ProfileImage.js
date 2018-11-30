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
        this.setState({ error: true });
    }

    render() {
        const { src, width, position } = this.props;
        const { error } = this.state;
        const size = width ? parseInt(width) : 60;
        return (
            <div className={`text-${position || 'center'}`}>
                {error ?
                    <div style={{ width: size, height: size }} className={`border rounded-circle border-secondary bg-light`} /> :
                    <img
                        src={src}
                        className="border rounded-circle border-secondary bg-light"
                        width={size}
                        height={size}
                        onError={this.handlError.bind(this)} />
                }
            </div>
        )
    }

}