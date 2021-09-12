import React from "react";

interface Props {
	name: string;
	currentText: string;
	onTextChange: Function;
	color: string;
	placeholder?: string;
	extraClasses?: string;
}

const TextInput: React.FC<Props> = ({
	name,
	currentText,
	onTextChange,
	color,
	placeholder = "",
	extraClasses = "",
}) => {
	return (
		<input
			type="text"
			name={name}
			value={currentText}
			onChange={(e) => onTextChange(e.target.value)}
			placeholder={placeholder}
			className={
				`
                text-xl font-light text-${color}-400 placeholder-${color}-300 text-center
                border-${color}-400 
                border
                w-full
                h-10
                px-2
                duration-200
                focus:outline-none focus:ring-2 focus:border-${color}-300
            ` + extraClasses
			}
			autoFocus
		/>
	);
};

export default TextInput;
