import React from "react";
/**
 * The Button Component.
 *
 * @version 1
 * @param  children - Add text|components
 * @param  type - Add primary|secondary|success|danger|warning|info|light|dark
 * @param  classes - Add the classes 
 */
const Alert = ({ children, classes, type }) => {
    return (
        // <div className={`alert alert-${type ? type : 'primary'} ${classes ? classes : ''} alert-dismissible fade show`} role="alert">{children}
        //     <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        //         <span aria-hidden="true">&times;</span>
        //     </button>
        // </div>
        <div className={`alert alert-${type ? type : 'primary'} ${classes ? classes : ''} alert-dismissible fade show`} role="alert">
            {children}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
};
export default Alert;
