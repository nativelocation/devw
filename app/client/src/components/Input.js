import React, { Component, Fragment } from "react";
import { COLORS } from '../config/constants';
/**
 * The Input Component.
 *
 * @version 1.0.1
 * @param { string } name - Input name and placeholder
 * @param { method } onChange - Method to onChange
 * @param { } password - Change to password's type
 * @param { } bigSize - Set the big size
 * @param { } disableAutoComplete
 * @param { } placeholder - Set placeholder = true to use Name value or placeholder = "value" to set custom 
 */
export default class Input extends Component {
    state = {
        revealPass: false
    };

    render() {
        const { name, disableAutoComplete, onChange, password, bigSize, placeholder, error } = this.props;
        let ph = placeholder === true ? name : placeholder;
        ph = ph === undefined ? "" : ph;
        ph = ph ? ph.charAt(0).toUpperCase() + ph.slice(1) : undefined;
        return (
            <Fragment>
                {password ?
                    <a style={styles.icon} href="#" onClick={() => this.setState({ revealPass: !this.state.revealPass })}>
                        <span className={!this.state.revealPass ? "jam jam-eye-f" : "jam jam-eye-close-f"}></span>
                    </a>
                    : null}
                <input
                    type={password ? !this.state.revealPass ? "password" : "text" : 'text'}
                    name={name}
                    placeholder={ph}
                    onChange={onChange}
                    style={styles.input}
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
        color: COLORS.BlueVariant,
        opacity: '0.5',
    }
}
