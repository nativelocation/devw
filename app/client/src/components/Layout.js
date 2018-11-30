import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import SideBar from '../components/Sidebar';
import ErrorCatch from '../components/ErrorCatch';

export default class Layout extends Component {
    render() {
        const { children, account } = this.props;
        return (
            <ErrorCatch>
                <div className="d-flex flex-column" style={styles.flex} >
                    <Navbar account={account} />
                    <div className="d-flex flex-row" style={styles.flex}>
                        <SideBar />
                        <div className='col-md-10 col-lg-10 h-100 p-0 d-flex flex-column'>
                            {children}
                        </div>
                    </div>
                </div>
            </ErrorCatch>
        )
    }
}

const styles = {
    flex: {
        flex: 1
    }
};
