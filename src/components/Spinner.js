import { memo } from "react";
import PropTypes from "prop-types";
import "./spinner.css";

const Spinner = memo(({ micro, small, large, primary, warning, danger, success, light, className, style }) => {
	let classList = "spinner inline-block";

	if (micro) {
		classList += " h-2 w-2";
	} else if (small) {
		classList += " h-4 w-4";
	} else if (large) {
		classList += " h-8 w-8";
	} else {
		classList += " h-6 w-6";
	}

	if (primary) {
		classList += " text-primary";
	} else if (warning) {
		classList += " text-warning";
	} else if (success) {
		classList += " text-success";
	} else if (danger) {
		classList += " text-danger";
	} else if (light) {
		classList += " light";
	} else {
		classList += " dark";
	}

	if (className) {
		classList += ` ${className}`;
	}
	return (
		<span className={classList} style={style}>
			<svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" className="fill-current">
				<circle fill="none" stroke="#000" cx="15" cy="15" r="14"></circle>
			</svg>
		</span>
	);
});
export default Spinner;
Spinner.propTypes = {
	/** string type default is text  */
	type: PropTypes.string,

	/** Extra class for input  */
	className: PropTypes.string,
	/** make white spinner  */
	light: PropTypes.bool,
	/** make black spinner  */
	dark: PropTypes.bool,
	/** make primary color spinner  */
	primary: PropTypes.bool,
	/** make green spinner  */
	success: PropTypes.bool,
	/** bool type default is false  */
	danger: PropTypes.string,
	/** True make micro button default is medium*/
	micro: PropTypes.bool,
	/** True make large button default is medium  */
	small: PropTypes.bool,
	/** True make large button default is medium  */
	large: PropTypes.bool,

	style: PropTypes.object,
};
