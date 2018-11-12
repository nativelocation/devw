import React, { Component } from "react";
import { COLORS, FONTS } from '../config/constants';

export default class ProfileInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { src } = this.props;
        return (
            <div class="text-center">
                <img src={src} className="rounded-circle" />
            </div>
        )
    }
}

const styles = {
    file: {

    }
}


