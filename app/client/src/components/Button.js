import React from "react";
import { COLORS } from '../config/constants';
/**
 * The Button Component.
 *
 * @version 1
 * @param  text - Add the text
 * @param  bigSize - Set the big size
 */
const Button = ({ text, bigSize, onClick, link }) => {
    const typeClass = link ? "btn-link text-danger" : "text-white";
    let style = !link ? { ...styles.common } : {};
    if (bigSize) style = { ...style, ...styles.bigButton };
    return (
        <button type={`${onClick ? "button" : "submit"}`} onClick={onClick} className={`bg-secondary btn float-right border-0 ${typeClass}`} style={style}>
            {text}
        </button>
    )
};

const styles = {
    common: {
        // backgroundColor: COLORS.Orange,
        fontSize: 13
    },
    bigButton: {
        width: 110,
        height: 50
    }
}

export default Button;
