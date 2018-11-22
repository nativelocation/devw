import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class NotFound extends Component {

    render() {
        return (
            <div className="d-flex flex-grow-1 align-items-center justify-content-center flex-column text-white">
                <span className="jam jam-alert pb-5" style={{ fontSize: 150 }}></span>
                <h1>Ups, seems like your're lost!</h1>
                <Link to='/' className="btn btn-outline-warning mt-5 pt-2"><h2>Go Home</h2></Link>
            </div>
        );
    }
}
