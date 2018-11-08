import React, { Component } from "react";
import { COLORS } from '../config/constants';

export default class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { text } = this.props;
        return (
            <button type="submit" className="btn font-weight-bold float-right" style={styles.buttonLogin}>{text}</button>
        )
    }
}

const styles = {
    buttonLogin: {
        border: 'none',
        backgroundColor: COLORS.Orange,
        color: '#fff',
        width: 110,
        height: 50,
        fontSize: 14,
    },
}


