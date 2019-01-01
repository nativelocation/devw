import React, { Component, Fragment } from "react";
import { COLORS } from '../config/constants';
/**
 * The Input Component.
 *
 * @version 1.0.1
 * @param { string } name - Input name and placeholder
 * @param { method } onChange - Method to onChange
 * @param { method } beforeSet - Method(value, next callback) to set validations before to set on input and trigger onChange event
 * @param { } password - Change to password's type
 * @param { } bigSize - Set the big size
 * @param { } disableAutoComplete
 * @param { } placeholder - Set placeholder = true to use Name value or placeholder = "value" to set custom 
 * @param { } error - if error is true, set a red border over the input
 * @param { } type - default type is 'text', you can customize by set this, password param will ignore this
 * @param { } max - set max limit in case you need, default will be set on 50
 */
export default class Input extends Component {
    state = {
        revealPass: false,
        input: ''
    };

    getValue() { return this.state.input; }
    setValue(input) { this.setState({ input }); }

    onChange(e) {
        const { onChange, beforeSet, disableSpaces } = this.props;
        let { value } = e.target;
        if (disableSpaces) value = value.replace(' ', '').trim();

        const setValue = () => {
            if (onChange) onChange(e);
            this.setState({ input: value });
        }
        if (beforeSet) beforeSet(value, setValue);
        else setValue();
    }

    render() {
        const { name, disableAutoComplete, password, bigSize, placeholder, error, type, max, value, disabled } = this.props;
        const { revealPass, input } = this.state;

        let ph = placeholder === true ? name : placeholder;
        ph = ph === undefined ? "" : ph;
        ph = ph ? ph.charAt(0).toUpperCase() + ph.slice(1) : undefined;

        let inputType = type || 'text';
        inputType = password ? (revealPass ? 'text' : 'password') : inputType;
        return (
            <Fragment>
                {password ?
                    <a tabIndex="-1" style={styles.icon} href="#" onClick={() => this.setState({ revealPass: !revealPass })}>
                        <span className={`jam jam-${!revealPass ? "eye-f" : "eye-close-f"}`}></span>
                    </a>
                    : null}
                <input
                    disabled={disabled}
                    value={value || input}
                    type={inputType}
                    name={name}
                    placeholder={ph}
                    onChange={this.onChange.bind(this)}
                    style={styles.input}
                    maxLength={max || 50}
                    className={`form-control ${bigSize ? "form-control-lg" : ''} ${error ? 'is-invalid' : ''}`}
                    autoComplete={disableAutoComplete ? 'on' : 'off'} />
            </Fragment>
        )
    }
}

const styles = {
    input: {
        fontSize: 15,
        color: COLORS.LightBlack
    },
    icon: {
        float: 'right',
        position: 'relative',
        right: 20,
        top: 38,
        color: COLORS.LightGray,
        opacity: '0.5',
    }
}
