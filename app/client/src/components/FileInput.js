import React, { Component, Fragment } from "react";
/**
 * The File input Component.
 *
 * @version 1.0.1
 * @param name - Input name
 */

const FileInput = ({ name }) => {
    return (
        <div className="custom-file">
            <input name={name} type="file" className="custom-file-input" id={`if-${name}`} />
            <label className="custom-file-label" htmlFor={`if-${name}`}>Choose file</label>
        </div>
    );
}

export default FileInput;
