import { memo } from "react";
import PropTypes from "prop-types";

const Input = memo((props) => {
	const default_props = {
		type: props.type,
		id: props.id,
		name: props.name,
		value: props.value,
		maxLength: props.maxLength,
		minLength: props.minLength,
		max: props.max,
		min: props.min,
		disabled: props.disabled,
		autoComplete: props.autoComplete,
		placeholder: props.placeholder,
		autoFocus: props.autoFocus,
		required: props.required,
		onFocus: props.onFocus,
		onChange: props.onChange,
		onKeyPress: props.onKeyPress,
		style: props.style,
		step: props.step,
	};
	const { className, error, success, small, large, children, label, stacked, controlRef, no_gap, light, note } = { ...props };

	let extraClass = "w-full z-0 box-border text-gray-dark focus:border-primary focus:outline-none placeholder-gray-light";
	if (small) {
		extraClass += stacked ? " h-7 text-base" : " h-7 px-2 text-base";
	} else if (large) {
		extraClass += stacked ? " h-10" : " h-10 px-2";
	} else {
		extraClass += stacked ? " h-8 text-base" : " h-8 px-2 text-base";
	}

	if (stacked) {
		extraClass += " border-b bg-transparent px-0";
	} else {
		extraClass += " border";
	}

	if (light) {
		extraClass += " text-white placeholder-gray-md";
	}

	const showError = (typeof error != "boolean" && error) || (typeof success != "boolean" && success);

	if (showError) {
		extraClass += " border-danger";
	} else if (success) {
		extraClass += " border-success";
	} else {
		extraClass += " border-gray-light";
	}

	if (className) {
		extraClass += ` ${className}`;
	}

	return (
		<div className="group">
			{label ? <label className={`text-black block font mb-1 ${showError ? "text-danger" : "text-black"} group-hover:text-primary`}>{label}</label> : null}
			{children}
			<input {...default_props} className={extraClass} ref={controlRef} />
			{error || note ? (
				<div className="h-6">
					{showError ? (
						<div className={`text-xs ${error ? "text-danger" : success ? "text-success" : null}`}>{error || success}</div>
					) : note ? (
						<div className="text-xs text-gray-medium">{note}</div>
					) : null}
				</div>
			) : null}
		</div>
	);
});
export default Input;
Input.propTypes = {
	/** string type default is text  */
	type: PropTypes.string,
	/** default is false   */
	disabled: PropTypes.bool,
	/** Extra class for input  */
	className: PropTypes.string,
	/** bool type default is false input type success  */
	success: PropTypes.bool,
	/** bool type default is false  */
	error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	/** True make small button default is medium*/
	small: PropTypes.bool,
	/** True make large button default is medium  */
	large: PropTypes.bool,
	/** onChange accept function  */
	onChange: PropTypes.func,
	/** onFocus accept function  */
	onFocus: PropTypes.func,
	/** onKeyPress accept function */

	onKeyPress: PropTypes.func,
	/*maxLength accept number  */
	maxLength: PropTypes.string,
	/*minLength accept number  */
	minLength: PropTypes.string,
	/*max accept number  */
	max: PropTypes.string,
	/*min accept number  */
	min: PropTypes.string,
	/** ref */
	// ref: PropTypes.object,

	/** boolean set auto focus default is false */
	autoFocus: PropTypes.bool,
	/** label on input string type */
	label: PropTypes.string,
	/** stacked bool type to position label */
	stacked: PropTypes.bool,

	/**bool type  required true if field can't be empty */
	required: PropTypes.bool,
	/*auto complete text suggestion string type*/
	autoComplete: PropTypes.string,
	/**input inline css object*/
	style: PropTypes.object,
	/**input placeholder string type */
	placeholder: PropTypes.string,
};
