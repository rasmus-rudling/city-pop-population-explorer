import React, { MouseEventHandler } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import spinner from "../../resources/spinner.svg";

interface Props {
	text: string;
	btnOnClick: MouseEventHandler<HTMLButtonElement>;
	color: string;
	extraClasses?: string;
	type?: "button" | "submit" | "reset";
	icon?: string;
	isLoading?: boolean;
	disabled?: boolean;
}

const Button2: React.FC<Props> = ({
	text,
	btnOnClick,
	color,
	extraClasses,
	icon,
	type = "button",
	isLoading = false,
	disabled = false,
}) => {
	let iconToDisplay;

	if (icon === "search") {
		iconToDisplay = <FontAwesomeIcon icon={faSearch} />;
	}

	let buttonClass = `
        text-l font-medium text-white
        w-24
        p-1
        duration-200
        flex justify-center items-center 
        focus:outline-none focus:ring-2 focus:ring-${color}-300 hover:border-${color}-300
    `;

	buttonClass += extraClasses;

	if (disabled) {
		buttonClass += ` bg-${color}-100 cursor-default`;
	} else {
		buttonClass += ` bg-${color}-500 border hover:bg-${color}-600`;
	}

	return (
		<button onClick={btnOnClick} className={buttonClass} type={type}>
			{isLoading ? (
				<img
					src={spinner}
					alt="spinner"
					className={`fill-current text-white h-6`}
				/>
			) : (
				<>
					{" "}
					{text}
					{iconToDisplay ? (
						<span className={`ml-1`}>{iconToDisplay}</span>
					) : null}
				</>
			)}
		</button>
	);
};

export default Button2;
