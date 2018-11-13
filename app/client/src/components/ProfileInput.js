import React, { Component } from "react";

export default class ProfileInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { src } = this.props;
        return (
            <div className="text-center">
                <img src={src} className="rounded-circle" />
            </div>
        )
    }
}

const styles = {
    file: {

    }
}


