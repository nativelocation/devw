import React, { Component } from "react";
import { COLORS, FONTS } from '../config/constants.js';
/**
 * The Select Input Component.
 *
 * @version 1.0.2
 * @param  items - Objects of array
 * @param  onChange - Add method
 * @param  name - Name of input | name of Id
 * @param  selected - Selected a default item to show
 * @param  placeholder - Show the default text, "string" | true | false
 */

export default class SelectInputGoals extends Component {
    state = {
        items: {},
    }

    render() {
        const { onChange, name, value, placeholder, classes, isForSideBar } = this.props;
        const content = typeof (placeholder);
        if (content === 'string') {
            defaultText = placeholder;
        }

        return (
            <div className="input-group">
                <select id={name} name={name} className={`custom-select text-white ${classes ? classes : ''}`} onChange={onChange} value={value} style={{ backgroundColor: '#666667', height: 35 }}>
                    <option>Monday</option>
                    <option>Tomorrow</option>
                    <option>Today</option>
                    {isForSideBar ? <option>Yesterday</option> : undefined}
                    <option>Custom</option>
                </select>
            </div>
        )
    }
};

