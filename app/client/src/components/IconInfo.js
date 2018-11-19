import React, { Component } from "react";
import ReactDOMServer from 'react-dom/server';
/**
 * The Icon popover Component.
 *
 * @version 1.0.1
 * @param  icon - Add class bootstrap to icon
 * @param  children - Add more components
 */
const IconInfo = ({ icon, children, color, hover }) => {
    const htmlChildren = ReactDOMServer.renderToString(children);

    return (
        <span className={icon}
            tabIndex="0"
            role="button"
            data-toggle="popover"
            data-trigger="focus"
            data-placement="bottom"
            title="Title"
            data-content={htmlChildren} style={[styles.size]}></span>
    );
}

const styles = {
    size: {
        fontSize: 16,
        //cursor pointer
        //hover color que se defina 
        //color qe se defina
    },
}

export default IconInfo;