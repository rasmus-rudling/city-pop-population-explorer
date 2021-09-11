import React, { MouseEventHandler } from "react";

interface Props {
	text: string;
	onClick: MouseEventHandler<HTMLButtonElement>;
	color: string;
	extraClasses?: string;
}

const Button1: React.FC<Props> = ({ text, onClick, color, extraClasses }) => {
	return (
		<button
			onClick={onClick}
			className={
				`
                text-xl 
                border 
                border-${color}-400 
                text-${color}-400
                font-light
                w-56
                h-10
                duration-200
                hover:border-${color}-500 
                hover:text-${color}-500
                hover:bg-${color}-50
            ` + extraClasses
			}
		>
			{text}
		</button>
	);
};

export default Button1;
