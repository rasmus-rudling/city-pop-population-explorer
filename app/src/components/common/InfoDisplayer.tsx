import React from "react";

interface Props {
	typeOfInfo: string;
	info: string;
}

const InfoDisplayer: React.FC<Props> = ({ typeOfInfo, info }) => {
	return (
		<div className={`relative h-16 flex items-end justify-center`}>
			<div
				className={`absolute top-0 h-8 flex justify-center items-center bg-white px-2 text-blue-400`}
			>
				{typeOfInfo}
			</div>
			<div
				className={`
                    flex justify-center items-center
                    text-xl font-light text-blue-400 placeholder-blue-300 text-center
                    border-blue-400 
                    border
                    w-full
                    h-12
                    px-2
                    duration-200
                `}
			>
				{info}
			</div>
		</div>
	);
};

export default InfoDisplayer;
