import React from "react";
import { COLORS } from "../config/constants";
/**
 * The Button Component.
 *
 * @version 1
 * @param  text - Add the text
 * @param  bigSize - Set the big size
 */
const Button = ({ text, bigSize, onClick, link, filter, disabled, classes, filled }) => {
	const typeClass = link ? "btn-link text-danger" : "text-white";
	let style = !link ? { ...styles.common } : {};
	if (bigSize) style = { ...style, ...styles.bigButton };
	if (filled) style = { ...style, width: "100%" };
	if (filter) style = { ...style, ...styles.filter };
	return (
		<button
			type={`${onClick ? "button" : "submit"}`}
			onClick={onClick}
			className={`btn border border-light ${typeClass} ${classes ? classes : ""}`}
			style={style}
			disabled={disabled}
		>
			{text}
		</button>
	);
};

const styles = {
	common: {
		// backgroundColor: COLORS.Orange,
		fontSize: 14
	},
	bigButton: {
		width: 110,
		height: 50,
		borderRadius: 1,
		backgroundColor: "#666667"
	},
	filter: {
		height: 35,
		borderRadius: 1,
		backgroundColor: "#666667"
	}
};

export default Button;
