import React, { Component, Fragment } from "react";
/**
 * The Radio input Component.
 *
 * @version 1.0.1
 * @param  id - Add id
 * @param  text - Description 
 * @param  name - Radio name 
 * @param  inline - true = row | false = column
 * @param  onChange - onChange method
 */

const RadioButton = ({ text, name, id, inline, onChange, value }) => {
    id = id ? id : `${name}0${value}`;
    return (
        <div className={`custom-control custom-radio ${inline ? "custom-control-inline" : ''}`}>
            <input type="radio" id={id} name={name} value={value} className="custom-control-input" onChange={onChange} />
            <label className="custom-control-label form-text text-muted" htmlFor={id}>{text}</label>
        </div>
    )
}

export default RadioButton;
