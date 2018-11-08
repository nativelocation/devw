import React, { Component, Fragment } from 'react';
import Navbar from '../components/Navbar';
import SideBar from '../components/Sidebar';
import Breadcrumb from '../components/Breadcrumb';


export default class Layout extends Component {

    render() {
        const { children, name } = this.props;
        return (
            <div style={styles.container}>
                <Navbar />
                <div style={styles.body}>
                    <SideBar />
                    <div className='col-md-10 col-lg-10 h-100 p-0'>
                        <Breadcrumb name={name} />
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    body: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
    }
};
