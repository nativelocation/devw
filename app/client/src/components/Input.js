import React, { Component, Fragment } from "react";
import { COLORS } from '../config/constants';

export default class Input extends Component {
    state = {};

    render() {
        const { name, disableAutoComplete, onChange, password, bigSize } = this.props;
        return (
            <Fragment>
                {password ?
                    <a style={styles.icon} href="#" onClick={() => this.setState({ revealPass: !this.state.revealPass })}>
                        <span className={!this.state.revealPass ? "jam jam-eye-f" : "jam jam-eye-close-f"}></span>
                    </a>
                    : null}
                <input type={password ? !this.state.revealPass ? "password" : "text" : 'text'} name={name} placeholder={name ? name.charAt(0).toUpperCase() + name.slice(1) : undefined} onChange={onChange} className={`form-control font-weight-bold ${bigSize ? "form-control-lg" : null}`} style={styles.input} autoComplete={disableAutoComplete ? 'on' : 'off'} />
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
