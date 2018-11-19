import React, { Component } from "react";
/**
 * The Profile input Component.
 *
 * @version 1.0.2
 * @param  src - Add image path
 * @param  width - Add new width to the image
 */

const ProfileImage = ({ src, width }) => {
    return (
        <div className="text-center">
            <img src={src ? src : undefined} className="border rounded-circle m-1 border-dark" style={{ width: width ? parseInt(width) : 60, padding: src ? undefined : 29, backgroundColor: '#F6F8FA' }} />
        </div>
    )
}

export default ProfileImage;