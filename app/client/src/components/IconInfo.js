import React, { Component } from "react";
import ReactDOMServer from 'react-dom/server';
/**
 * The Icon popover Component.
 *
 * @version 1.0.1
 * @param  icon - Add class bootstrap to icon
 * @param  children - Add more components
 */
export default class IconInfo extends Component {
    render() {
        const { icon, children } = this.props;
        const htmlChildren = ReactDOMServer.renderToString(children)
        return (
            <span className={icon}
            tabIndex="0"
            role="button"
            data-toggle="popover"
            data-trigger="focus"
            data-placement="bottom"
            title="Title"
            data-content={htmlChildren} style={styles.size}></span>
        )
    }
}

const styles = {
    size: {
        fontSize: 16,
    }
}