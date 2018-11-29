import React, { Fragment } from "react";
import { COLORS } from '../config/constants';
import { Link } from "react-router-dom";
/**
 * The Breadcrumb Component.
 *
 * @version 1.0.2
 * @param  name - Add the current path
 */

const Breadcrumb = ({ links }) => {
    return (
        <div style={styles.container}>
            <div className='float-right'>
                <p className='ml-auto mt-3 mr-5' style={styles.breadcrum}>
                    {!links || links.length === 0 ? <Fragment>Home</Fragment> : null}
                    {links && links.map((x, i) => {
                        let value;
                        if (!x.link) value = <span className="text-white">{x.name}</span>
                        else if (x.onClick) value = <a href={x.link || "javascript:;"} className="text-white" onClick={e => { e.preventDefault(); x.onClick(); }}>{x.name}</a>
                        else value = <Link to={x.link} style={styles.breadcrum}>{x.name}</Link>

                        return (<Fragment key={i}>{i === 0 ? '' : '>'} {value} </Fragment>)
                    })}
                </p>
            </div>
        </div>
    )
};

const styles = {
    container: {
        backgroundColor: COLORS.LightGray,
        height: 56
    },
    breadcrum: {
        color: COLORS.White,
        fontSize: 14
    }
};

export default Breadcrumb;