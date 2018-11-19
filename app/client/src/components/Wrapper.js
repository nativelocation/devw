import React, { Component, Fragment } from 'react';
/**
 * The Wrapper Component.
 *
 * @version 1.0.1
 * @param  name - Add title
 * @param  children - Add more components 
 */

const Wrapper = ({ children, name }) => {
    return (
        <div id="scrollWrapper" className='col-md-12 col-lg-12 p-3' style={styles.flex}>
            <div className='col-md-12 col-lg-12 bg-primary m-0 py-2'>
                <h4 className='font-weight-light pl-2 m-0 text-white'>{name}</h4>
            </div>
            <div className='col-md-12 col-lg-12 bg-white p-5'>
                {children}
            </div>
        </div>
    );
}

const styles = {
    flex: {
        flex: 1
    }
};

export default Wrapper;