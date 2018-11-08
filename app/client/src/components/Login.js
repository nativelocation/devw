import React, { Component } from "react";
import "../styles/login.css";

export default class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control" name="username" placeholder="Username" style={styles.input} autoComplete="off" />
                    </div>
                    <div className="form-group position-relative">
                        <a href="#"><i className={!this.state.revealPass ? "far fa-eye icon" : "far fa-eye-slash icon"} onClick={() => this.setState({ revealPass: !this.state.revealPass })}></i></a>
                        <input type={!this.state.revealPass ? "password" : "text"} className="form-control" name="password" placeholder="Password" style={styles.input} autoComplete="off" />
                    </div>
                    <button type="button" className="btn btn-primary font-weight-bold" style={styles.buttonLogin}>Login</button>
                </form>
            </div>
        )
    }
}

const styles = {
    input: {
        height: 50,
        fontWeight: 'bold',
        fontSize: 15,
        color: '#4c8bce'
    },
    buttonLogin: {
        width: 110,
        height: 50,
        fontSize: 14,
        backgroundColor: '#348ef5'
    }
}
