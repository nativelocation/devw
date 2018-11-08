import React, { Component } from "react";
import { COLORS, FONTS } from '../config/constants';

export default class Breadcrumb extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { name } = this.props;
        return (
            <div style={styles.container}>
                <div className='float-right'>
                    <p className='ml-auto mt-3 mr-3' style={styles.breadcrum}>Home > {name}</p>
                </div>
            </div>
        )
    }
}

const styles = {
    container: {
        backgroundColor: COLORS.LightGray,
        height: 56
    },
    breadcrum: {
        color: COLORS.White,
        fontFamily: FONTS.RobotoRegular,
        fontSize: 14
    }
};