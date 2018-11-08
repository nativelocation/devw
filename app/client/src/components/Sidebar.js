import React, { Component } from "react";
import { COLORS } from '../config/constants';

export default class SideBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='col-md-2 col-lg-2 px-0 gradient h-100'>
                <nav className="nav flex-column justify-content-center alignt-items-center">
                    <a className="nav-link active py-3" href="javascript:;" style={styles.dashboard}><i className="fas fa-tachometer-alt"></i> Dashboard</a>
                    <p className="mb-0 pl-3 py-2 text-white font-weight-light" style={styles.title}>Title</p>
                    <a className="nav-link text-white pt-3" href="javascript:;"><i className="fas fa-users"></i> People</a>
                    <a className="nav-link text-white py-3" href="javascript:;"><i className="fas fa-envelope"></i> Messages</a>
                    <a className="nav-link text-white py-3" href="javascript:;"><i className="fas fa-bell"></i> Alert</a>
                    <a className="nav-link text-white py-3" href="javascript:;"><i className="fas fa-flag"></i> Tasks</a>
                </nav>
            </div>
        )
    }
}

const styles = {
    dashboard: {
        backgroundColor: COLORS.Orange,
        color: COLORS.White
    },
    title: {
        backgroundColor: COLORS.Black,
        fontSize: 14
    }
};