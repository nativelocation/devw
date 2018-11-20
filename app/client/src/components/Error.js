import React, { Fragment } from "react";
/**
 * The Error Component.
 *
 * @version 1
 * @param  text - Text of the error message, if it's empty, not show anything
 */

const Error = ({ text }) => {
    return (
        <Fragment>
            {text ? <span className='invalid-feedback'>{text}</span> : undefined}
        </Fragment>
    )
}

export default Error;