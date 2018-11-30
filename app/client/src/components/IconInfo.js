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
    state = {
        colorIcon: this.props.color || '#2C3A41',
    }

    handleHover = colorIcon => {
        if (colorIcon)
            this.setState({ colorIcon });
    }

    render() {
        const { icon, children, hover, color, onClick, hide } = this.props;
        if (hide) return null;
        const { colorIcon } = this.state;
        const htmlChildren = ReactDOMServer.renderToString(children);
        return (
            <span
                tabIndex="-1"
                className={`jam jam-${icon} noBorder ${hover ? "cursor-pointer" : ""}`}
                role="button"
                data-toggle="popover"
                data-trigger="focus"
                data-placement="bottom"
                data-content={htmlChildren}
                style={{ color: colorIcon, fontSize: 16 }}
                onMouseEnter={this.handleHover.bind(this, hover || '#777777')}
                onMouseLeave={this.handleHover.bind(this, color || '#2C3A41')}
                onClick={onClick} />
        );
    }
}