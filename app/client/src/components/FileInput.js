import React, { Component, Fragment } from "react";

export default class FileInput extends Component {
    render() {
        const { name } = this.props;
        return (
            <div class="custom-file">
                <input name={name} type="file" class="custom-file-input" id="customFile" />
                <label class="custom-file-label" for="customFile">Choose file</label>
            </div>
        )
    }
}

