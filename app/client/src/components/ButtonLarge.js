import React, { Component } from "react";
import { COLORS, FONTS } from '../config/constants.js';

export default class ButtonLarge extends Component {
    render() {
        const { text } = this.props;
        return (
            <button type="submit" className="btn btn-lg font-weight-bold float-right text-white" style={styles.large}>{text}</button>
        )
    }
}

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


