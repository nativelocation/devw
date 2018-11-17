import React from "react";
import { COLORS } from '../config/constants';
/**
 * The Button Component.
 *
 * @version 1
 * @param  text - Add the text
 * @param  bigSize - Set the big size
 */
const Button = ({ text, bigSize, onClick }) => {
    return (
        <button type="submit" onClick={onClick} className="btn float-right text-white border-0" style={bigSize ? styles.bigButton : styles.normalButton}>{text}</button>
    )
};

const styles = {
    normalButton: {
        backgroundColor: COLORS.Orange,
        fontSize: 13
    },
    bigButton: {
        backgroundColor: COLORS.Orange,
        width: 110,
        height: 50,
        fontSize: 13
    },
}

export default Button;
