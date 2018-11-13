import React, { Component, Fragment } from 'react';
import Navbar from '../components/Navbar';
import SideBar from '../components/Sidebar';
import Breadcrumb from '../components/Breadcrumb';


export default class Layout extends Component {

    render() {
        const { children, name, account } = this.props;
        return (
            <div className="d-flex flex-column" style={styles.flex}>
                <Navbar account={account} />
                <div className="d-flex flex-row" style={styles.flex}>
                    <SideBar />
                    <div className='col-md-10 col-lg-10 h-100 p-0 d-flex flex-column'>
                        {name ? <Breadcrumb name={name} /> : null}
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    flex: {
        flex: 1
    }
};
