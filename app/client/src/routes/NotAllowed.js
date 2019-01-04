import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class NotAllowed extends Component {

    render() {
        return (
            <div className="d-flex flex-grow-1 align-items-center justify-content-center flex-column text-white bg-dark">
                <span className="jam jam-close-circle-f pb-5 text-danger" style={{ fontSize: 150 }}></span>
                <h1>Ups!, You are not allowed to be here...</h1>
                <Link to='/' className="btn btn-warning mt-5 pt-2"><h2>Go Home</h2></Link>
            </div>
        );
    }
}
