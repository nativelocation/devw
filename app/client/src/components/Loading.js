import React, { Component } from "react";
import { COLORS } from '../config/constants';

export default class Loading extends Component {
    render() {
        return (
            <div className="h-100 d-flex align-items-center justify-content-center">
                <div className="d-flex flex-column col-md-3">
                    <object data="/assets/img/loading.svg" />
                    <span className='text-lg-left mx-auto font-weight-light' style={styles.loadingText}>LOADING..</span>
                </div>
            </div>
        )
    }
}
const styles = {
    loadingText: {
        color: COLORS.LightGray,
        fontSize: 40
    }
};