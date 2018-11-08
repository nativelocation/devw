import React, { Component } from "react";
import { COLORS } from '../config/constants';

export default class SideBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='d-none d-md-block col-md-3 col-lg-2 px-0 bar float-left' id="sidebar" style={styles.container}>
                <nav className="nav flex-column justify-content-center alignt-items-center">
                    <a className="nav-link active py-3" href="#" style={styles.dashboard}><i className="fas fa-tachometer-alt"></i> Dashboard</a>
                    <p className="mb-0 pl-3 py-2 text-white font-weight-light" style={styles.title}>Title</p>
                    <a className="nav-link text-white pt-3" href="#"><i className="fas fa-users"></i> People</a>
                    <a className="nav-link text-white py-3" href="#"><i className="fas fa-envelope"></i> Messages</a>
                    <a className="nav-link text-white py-3" href="#"><i className="fas fa-bell"></i> Alert</a>
                    <a className="nav-link text-white py-3" href="#"><i className="fas fa-flag"></i> Tasks</a>
                </nav>
            </div>
        )
    }
}

const styles = {
    container:{
        width: 230 
    },
    dashboard: {
        backgroundColor: COLORS.Orange,
        color: COLORS.White
    },
    title: {
        backgroundColor: COLORS.Black,
        fontSize: 14
    }
};