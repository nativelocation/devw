import React, { Component, Fragment } from "react";
import { FONTS } from '../config/constants.js'

export default class ProfileView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { src, name, orientation } = this.props;
        return (
            <Fragment>
                <div className={orientation ? "d-flex flex-row justify-content-center align-items-center mt-2" : "d-flex flex-column justify-content-center align-items-center mt-2"}>
                    <div className="text-center">
                        <img src={src} className="border border-dark rounded-circle" />
                    </div>
                    <p className="font-weight-bold pt-2" style={styles.text}>{name}</p>
                    <p className="" style={styles.littleText}>Agent</p>
                </div>
            </Fragment>
        )
    }
}

const styles = {
    text: {
        fontSize: 13,
        fontFamily: FONTS.RobotoRegular,
    },
    littleText: {
        position: 'relative',
        bottom: 16,
        fontSize: 11,
        fontFamily: FONTS.RobotoLight,
    }
}


