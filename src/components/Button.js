import { memo } from "react";
import PropTypes from "prop-types";
import Spinner from "./Spinner";

const Button = memo(
	({ loader, disabled, className, primary, secondary, warning, danger, success, text, link, border, micro, small, large, style, onClick, tooltip, children, controlRef, block, noUpperCase }) => {
		const isDisabled = loader ? true : disabled ? true : false;
		let extraClass = "round-none inline-flex items-center justify-center relative focus:outline-none";
		if (!noUpperCase) {
			extraClass += " uppercase";
		}
		if (micro) {
			extraClass += " h-5 px-6 text-xs";
		} else if (small) {
			extraClass += "  h-7  px-6 text-base";
		} else if (large) {
			extraClass += " h-10  px-7";
		} else {
			extraClass += " h-8 px-6 text-base";
		}
		if (text) {
			extraClass += " text-gray-dark";
		} else {
			if (primary) {
				if (link) {
					extraClass += " bg-transparent text-primary";
				} else if (border) {
					extraClass += " bg-transparent text-primary border border-primary";
				} else {
					extraClass += " bg-primary text-white";
				}
			} else if (secondary) {
				if (link) {
					extraClass += " bg-transparent text-secondary";
				} else if (border) {
					extraClass += " bg-transparent text-secondary border border-secondary";
				} else {
					extraClass += " bg-secondary text-white";
				}
			} else if (warning) {
				if (link) {
					extraClass += " bg-transparent text-warning";
				} else if (border) {
					extraClass += " bg-transparent text-warning border border-warning";
				} else {
					extraClass += " bg-warning text-white";
				}
			} else if (danger) {
				if (link) {
					extraClass += " bg-transparent text-danger";
				} else if (border) {
					extraClass += " bg-transparent text-danger border border-danger";
				} else {
					extraClass += " bg-danger text-white";
				}
			} else if (success) {
				if (link) {
					extraClass += " bg-transparent text-success";
				} else if (border) {
					extraClass += " bg-transparent text-success border border-success";
				} else {
					extraClass += " bg-success text-white";
				}
			} else {
				if (link) {
					extraClass += " bg-transparent text-primary";
				} else if (border) {
					extraClass += " bg-transparent text-gray-medium border border-gray-dark";
				} else {
					extraClass += " bg-gray-lightest text-gray-medium";
				}
			}
		}
		if (block) {
			extraClass += " w-full";
		} else {
			extraClass += " block";
		}
		if (className) {
			extraClass += ` ${className}`;
		}
		if (disabled) {
			extraClass += " opacity-50 cursor-not-allowed";
		}
		return (
			<button onClick={onClick || null} disabled={isDisabled} className={extraClass} ref={controlRef} title={tooltip} style={{ position: loader ? "relative" : "", ...(style || {}) }}>
				<>
					{children}
					{!loader ? null : micro ? (
						<Spinner className="absolute" style={{ width: "12px", height: "12px", top: "4px", right: "5px" }} />
					) : !loader ? null : small ? (
						<Spinner className="absolute" style={{ width: "15px", height: "15px", top: "6px", right: "5px" }} />
					) : large ? (
						<Spinner className="absolute" style={{ width: "18px", height: "18px", top: "11px", right: "5px" }} />
					) : (
						<Spinner className="absolute" style={{ width: "16px", height: "16px", top: "8px", right: "5px" }} />
					)}
				</>
			</button>
		);
	}
);
export default Button;
Button.propTypes = {
	/** True make loader visible  */
	loader: PropTypes.bool,
	/** True disabled button  */
	disabled: PropTypes.bool,
	/** Extra class for button  */
	className: PropTypes.string,
	/** Primary make button with main color  */
	primary: PropTypes.bool,
	/** warning make button orange type  */
	warning: PropTypes.bool,
	/** true make error type button  */
	danger: PropTypes.bool,
	/** True make small button default is medium*/
	micro: PropTypes.bool,
	small: PropTypes.bool,
	/** True make large button default is medium  */
	large: PropTypes.bool,
	/** inline style object  */
	style: PropTypes.object,
	/** onClick accept function  */
	onClick: PropTypes.func,
	/** toolTip string type show tooltip  */
	tooltip: PropTypes.string,
};
