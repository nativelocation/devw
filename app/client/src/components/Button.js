import React, { Component } from "react";
import { COLORS, FONTS } from '../config/constants';

export default class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { text, bigSize } = this.props;
        return (
            <button type="submit" className="btn font-weight-bold float-right text-white" style={bigSize ? styles.bigButton : styles.normalButton}>{text}</button>
        )
    }
}

const styles = {
    normalButton: {
        border: 'none',
        backgroundColor: COLORS.Orange,
        fontSize: 13,
        fontFamily: FONTS.RalewayMedium,
    },
    bigButton: {
        border: 'none',
        backgroundColor: COLORS.Orange,
        width: 110,
        height: 50,
        fontSize: 13,
        fontFamily: FONTS.RalewayMedium,
    },
}


