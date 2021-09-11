import React, { MouseEventHandler } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface Props {
	text: string;
	onClick: MouseEventHandler<HTMLButtonElement>;
	color: string;
	extraClasses?: string;
	type?: "button" | "submit" | "reset";
	icon?: string;
}

const Button2: React.FC<Props> = ({
	text,
	onClick,
	color,
	extraClasses,
	icon,
	type = "button",
}) => {
	let iconToDisplay;

	if (icon === "search") {
		iconToDisplay = <FontAwesomeIcon icon={faSearch} />;
	}

	return (
		<button
			onClick={onClick}
			className={
				`
                text-l font-medium text-white
                border border-${color}-400 
                w-max
                px-3
                py-1
                duration-200
                bg-${color}-500
                hover:bg-${color}-600
            ` + extraClasses
			}
			type={type}
		>
			{text}

			{iconToDisplay ? (
				<span className={`ml-1`}>{iconToDisplay}</span>
			) : null}
		</button>
	);
};

export default Button2;
