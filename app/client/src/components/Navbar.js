import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    onLogout() {
        localStorage.removeItem('tokenAuth');
        window.location.reload();
    }

    render() {
        const { account } = this.props
        return (
            <nav className="navbar navbar-expand-lg navbar-dark gradient">
                <a className="navbar-brand" href="javascript:;"><img src="/assets/img/hypergolic-logoWhite.png" width="140" /></a>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                        <div className="dropdown mx-3">
                            <button className="btn btn-link" data-toggle="dropdown" style={{ textDecoration: 'none' }}>
                                <img src='/assets/img/4.jpg' className="rounded-circle border border-light mr-3" style={{ width: 35 }} />
                                <span className='text-white'>{account.name}</span>
                            </button>
                            <div className="dropdown-menu">
                                <Link to="/profile" className="dropdown-item">Profile</Link>
                                <div className="dropdown-divider" />
                                <button className="dropdown-item" onClick={this.onLogout}>Loguot</button>
                            </div>
                        </div>
                    </ul>
                </div>
            </nav>
        );
    }
}