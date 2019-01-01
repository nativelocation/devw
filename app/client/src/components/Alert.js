import React from "react";
/**
 * The Button Component.
 *
 * @version 1
 * @param  children - Add text|components
 * @param  type - Add primary|secondary|success|danger|warning|info|light|dark
 * @param  classes - Add the classes 
 */
const Alert = ({ children, className, type, hide, onClose }) => {
    if (hide) return null;
    return (
        <div className={`alert alert-${type ? type : 'primary'} ${className || ''}`}>
            {children}
            {onClose ?
                <button type="button" className="close" onClick={onClose}>
                    <span aria-hidden="true">&times;</span>
                </button> : null}
        </div>
    )
};
export default Alert;