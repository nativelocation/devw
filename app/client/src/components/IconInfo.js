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
        colorIcon: this.props.color || '#ccc',
    }

    handleHover = colorIcon => {
        if (colorIcon)
            this.setState({ colorIcon });
    }

    render() {
        const { icon, children, hover, color, onClick } = this.props;
        const htmlChildren = ReactDOMServer.renderToString(children);
        return (
            <span className={`${hover ? "cursor-pointer" : ""} jam jam-${icon} noBorder`}
                tabIndex="0"
                role="button"
                data-toggle="popover"
                data-trigger="focus"
                data-placement="bottom"
                data-content={htmlChildren} style={{ color: this.state.colorIcon, fontSize: 16 }} onMouseEnter={this.handleHover.bind(this, hover)} onMouseLeave={this.handleHover.bind(this, color)} onClick={onClick}></span>
        );

    }
}

const styles = {
    size: {
        fontSize: 16
    },
}