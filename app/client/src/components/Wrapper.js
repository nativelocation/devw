import React, { Component, Fragment } from 'react';
import { COLORS, FONTS } from '../config/constants'

export default class Wrapper extends Component {

    render() {
        const { children, name } = this.props;
        return (
            <div id="scrollWrapper" className='col-md-12 col-lg-12 pt-5' style={styles.flex}>
                <div className='col-md-12 col-lg-12'>
                    <div className="bg-primary m-0 py-2">
                        <h4 style={styles.title}>{name}</h4>
                    </div>
                </div>
                <div className='col-md-12 col-lg-12'>
                    <div className="bg-info p-3">
                        {children}
                    </div>
                </div>
            </div>


        );
    }
}

const styles = {
    flex: {
        flex: 1
    },
    title: {
        fontFamily: FONTS.RobotoLight,
        fontSize: 22,
        color: COLORS.White,
        position: 'relative',
        left: 20,
        top: 4,
    }
};
