import React, { Component } from "react";
/**
 * The Profile input Component.
 *
 * @version 1.0.2
 * @param  src - Add image path
 * @param  w - Add new width to the image
 */

const ProfileInput = ({ src, w }) => {
    return (
        <div className="text-center">
            <img src={src} className="rounded-circle" style={{ width: w ? parseInt(w) : undefined }} />
        </div>
    )
}
export default ProfileInput;