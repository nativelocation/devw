import React, { Component } from "react";

export default class SideBar extends Component {
    render() {
        const NavLink = ({ icon, name, active, orange }) =>
            (<a className={`nav-link text-white py-3 ${active ? 'active' : orange ? 'orange-link' : ''}`} href="javascript:;">
                <i className={`fas mr-2 ${icon}`}></i>{name}
            </a>);

        return (
            <div className='col-md-2 col-lg-2 px-0 gradient h-100'>
                <nav id='navlinks' className="nav flex-column justify-content-center alignt-items-center">
                    <NavLink icon='fa-tachometer-alt' name='Dashboard' orange />
                    <NavLink icon='fa-users' name='Users' />
                    <NavLink icon='fa-envelope' name='Messages' active />
                    <NavLink icon='fa-bell' name='Alert' />
                    <NavLink icon='fa-flag' name='Tasks' />
                </nav>
            </div>
        )
    }
}