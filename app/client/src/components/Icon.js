import React from "react";
/**
 * The Button Component.
 *
 * @version 1
 * @param  name - Add the icon name
 * @param  size - Set the size 
 * @param  color - Add color  
 * @param  onClick - Add the method 
 * @param  fontWeight - Add type of font  
 */
const Icon = ({ name, size, onClick, fontWeight, classes, color }) => {
    let fontSize = size ? parseInt(size) : undefined;
    return (
        <span className={`jam jam-${name} ${classes ? classes : ''}`} style={{ fontSize, fontWeight, marginTop: -1, color }} onClick={onClick}></span>
    )
};
export default Icon;
