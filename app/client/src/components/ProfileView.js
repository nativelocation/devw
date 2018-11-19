import React, { Component, Fragment } from "react";
import { COLORS, FONTS } from '../config/constants.js'
import ProfileImage from '../components/ProfileImage';
/**
 * The Profile input Component.
 *
 * @version 1.0.1
 * @param  src - Add image path
 * @param  title - Add main title 
 * @param  subtitle - Add subtitle 
 * @param  orientation - true = row | false = column
 * @param  children - Add more components 
 */
const ProfileView = ({ src, title, subtitle, orientation, children, width }) => {
    return (
        <div className={`d-flex mt-2 hoverBox ${orientation ? "flex-row flex-grow-1" : "flex-column justify-content-center align-items-center p-2"}`}>
            <ProfileImage src={src ? src : undefined} width={width ? width : 60} />
            <div className={orientation ? "pl-2 pt-3 flex-grow-1" : "text-center pl-2 pt-3"}>
                <p className="font-weight-bold m-0 " style={styles.text}>{title}</p>
                <p className={orientation ? "" : "text-center"} style={styles.littleText}>{subtitle}</p>
            </div>
            {children}
        </div>
    )
}

const styles = {
    text: {
        fontSize: 13,
        fontFamily: FONTS.RobotoLight,
        color: COLORS.LightBlack,
    },
    littleText: {
        color: COLORS.LightGray,
        fontSize: 11,
        fontFamily: FONTS.RobotoLight,
    }
}

export default ProfileView;


