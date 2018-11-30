import React, { Component } from 'react';

export default class ErrorCatch extends Component {
    state = {
        hasError: false,
        errorMessage: 'Generic message'
    }

    componentDidCatch(error, info) {
        console.error(error, info);
        this.setState({ hasError: true, errorMessage: error.message });
    }

    render() {
        const { children } = this.props;
        const { hasError, errorMessage } = this.state;

        if (!hasError) return (children);
        else return (
            <div className="d-flex flex-grow-1 align-items-center justify-content-center flex-column text-white bg-dark">
                <span className="jam jam-close-circle-f text-danger pb-5" style={{ fontSize: 150 }}></span>
                <h1>Ups, something went wrong!</h1>
                <h2>Please, Try Again</h2>
                {errorMessage && errorMessage.length > 0 ?
                    <div className="pt-5 align-items-center">
                        <h3 className="text-danger text-center">Message:</h3>
                        <div className="p-3 bg-warning text-dark">{errorMessage}</div>
                    </div> : null}
            </div>
        )
    }
}