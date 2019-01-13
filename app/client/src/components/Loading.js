import React from "react";
import { COLORS } from '../config/constants';
/**
 * The Label Component.
 *
 * @version 1
 * @param  textColor - Color of text, default is gray
 */
const Loading = ({ show, textColor, absolute, text, backgroundClass }) => {
    let classValues = absolute ? "position-absolute fixed-top fixed-bottom " : "";
    classValues += backgroundClass || "bg-white";
    if (!show) return null;
    return (
        <div className={`h-100 d-flex align-items-center justify-content-center ${classValues}`}>
            <div className="d-flex flex-column col-md-3">
                <object data="/assets/img/loading.svg" />
                <span className='text-lg-left mx-auto font-weight-light' style={{ color: textColor || COLORS.LightGray, fontSize: 20 }}>{text || "LOADING.."}</span>
            </div>
        </div>
    )
}

export default Loading;