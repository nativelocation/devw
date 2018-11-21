import React from "react";
/**
 * The File input Component.
 *
 * @version 1.0.1
 * @param name - Input name
 */

const FileInput = ({ name, placeholder, onChange, error }) => {
    return (
        <div className="custom-file">
            <input name={name} type="file" className={`custom-file-input ${error ? 'is-invalid' : ''}`} onChange={onChange} id={name} />
            <label className="custom-file-label" htmlFor={name}>{placeholder || "Choose File"}</label>
        </div>
    );
}

export default FileInput;
