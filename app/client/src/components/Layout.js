import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import SideBar from '../components/Sidebar';

export default class Layout extends Component {
    state = {
        hasError: false,
        errorMessage: 'lalala'
    }

    componentDidCatch(error, info) {
        console.log(error, info);
        this.setState({ hasError: true, errorMessage: error.message });
    }

    render() {
        const { children, account } = this.props;
        const { hasError, errorMessage } = this.state;

        if (!hasError) return (
            <div className="d-flex flex-column" style={styles.flex} >
                <Navbar account={account} />
                <div className="d-flex flex-row" style={styles.flex}>
                    <SideBar />
                    <div className='col-md-10 col-lg-10 h-100 p-0 d-flex flex-column'>
                        {children}
                    </div>
                </div>
            </div>
        )
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

const styles = {
    flex: {
        flex: 1
    }
};
