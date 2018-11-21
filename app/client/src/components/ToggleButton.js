import React, { Component } from "react";
import Icons from './Icon';
/**
 * The ToggleButton Component.
 *
 * @version 1
 * @param  onChange - Add Method
 */
export default class ToggleButton extends Component {
    state = {
        active: true,
    }

    activeButton = type => {
        const { onChange } = this.props;
        if(onChange) onChange(type)
        this.setState({ active: type });
    }

    render() {
        const { active } = this.state;
        return (
            <div className="d-flex flex-row">
                <div className="btn-group mr-2" role="group">
                    <button type="button" className="btn border noBorder px-2 py-0 d-flex align-items-center" onClick={this.activeButton.bind(this, true)} style={{ height: 35 }}>
                        <Icons name="grid-f" size="22" color={active ? '#777777' : '#ccc'} /><Icons name="grid-f" size="22" color={active ? '#777777' : '#ccc'} />
                    </button>
                    <button type="button" className="btn border noBorder px-1 py-0" onClick={this.activeButton.bind(this, false)} style={{ height: 35 }}>
                        <Icons name="align-justify" size="32" color={active ? '#ccc' : '#777777'} /><Icons name="align-justify" size="32" color={active ? '#ccc' : '#777777'} />
                    </button>
                </div>
            </div>
        )
    }
};
