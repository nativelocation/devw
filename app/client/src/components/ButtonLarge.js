import React from "react";
import { COLORS, FONTS } from '../config/constants.js';
/**
 * The Button Large Component.
 *
 * @version 1.0.2
 * @param  text - Add the text
 * @param  onClick - Add method
 */
const ButtonLarge = ({ text, onClick, className }) => {
    return (
        <button
            type="submit"
            onClick={onClick}
            className={`btn btn-lg font-weight-bold float-right text-white ${className}`} style={styles.large}>
            {text}
        </button>
    )
};

const styles = {
    large: {
        border: 'none',
        backgroundColor: COLORS.Orange,
        fontSize: 13,
        fontFamily: FONTS.Roboto,
        fontWeight: 300,
        width: 150
    },
}

export default ButtonLarge

