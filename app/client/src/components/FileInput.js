import React, { Component, Fragment } from "react";

export default class FileInput extends Component {
    render() {
        const { name } = this.props;
        return (
            <div className="custom-file">
                <input name={name} type="file" className="custom-file-input" id={`if-${name}`} />
                <label className="custom-file-label" htmlFor={`if-${name}`}>Choose file</label>
            </div>
        )
    }
}

