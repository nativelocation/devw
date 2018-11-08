import React, { Component } from 'react';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    onLogout() {
        localStorage.removeItem('tokenAuth');
        window.location.reload();
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bar">
                    <a className="navbar-brand" href="#"><img src="assets/img/hypergolic-logoWhite.png" width="140" alt="" /></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                            <li className="nav-item mx-3">
                                <a className="nav-link text-white mt-1" href="#"><i className="fas fa-users"></i> People</a>
                            </li>
                            <li className="nav-item mx-3">
                                <a className="nav-link text-white mt-1" href="#"><i className="fas fa-envelope"></i> Messages</a>
                            </li>
                            <li className="nav-item mx-3">
                                <a className="nav-link text-white mt-1" href="#"><i className="fas fa-bell"></i> Alert</a>
                            </li>
                            <li className="nav-item mx-3">
                                <a className="nav-link text-white mt-1" href="#"><i className="fas fa-flag"></i> Tasks</a>
                            </li>
                            <div className="dropdown mx-3">
                                <button className="btn btn-link" id="profileMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ textDecoration: 'none' }}><img src='assets/img/4.jpg' className="rounded-circle border border-light mr-3" style={{ width: 35 }} /><span style={{ color: '#FFF' }}>Lorem Ipsum</span></button>
                                <div className="dropdown-menu" style={{ width: 167 }} aria-labelledby="profileMenu">
                                    <a className="dropdown-item" href="#">Profile</a>
                                    <hr />
                                    <a className="dropdown-item" href="javascript:;" onClick={this.onLogout}>Loguot</a>
                                </div>
                            </div>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}