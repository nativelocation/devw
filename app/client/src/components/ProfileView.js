import React, { Component, Fragment } from "react";
import { COLORS, FONTS } from '../config/constants.js'

export default class ProfileView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { src, title, subtitle, orientation, children } = this.props;
        return (
            <Fragment>
                <div className={orientation ? "d-flex flex-row mt-2 hoverBox" : "d-flex flex-column justify-content-center align-items-center mt-2 hoverBox"}>
                    <div className="text-center">
                        <img src={src} className="border border-dark rounded-circle m-1" style={{ width: 60 }} />
                    </div>
                    <div className={orientation ? "float-right pl-2 pt-3" : "text-center pl-2 pt-3"}>
                        <p className="font-weight-bold m-0" style={styles.text}>{title}</p>
                        <p className={orientation ? "" : "text-center"} style={styles.littleText}>{subtitle}</p>
                    </div>
                    {children}
                </div>
            </Fragment>
        )
    }
}

const styles = {
    text: {
        fontSize: 13,
        fontFamily: FONTS.RobotoLight,
        color: COLORS.LightBlack,
    },
    littleText: {
        color: COLORS.LightGray,
        fontSize: 11,
        fontFamily: FONTS.RobotoLight,
    }
}


