import React from "react";
import { useHistory } from "react-router";

// interface Props {}

const PageWrapper: React.FC = ({ children }) => {
	const history = useHistory();

	return (
		<div className="flex flex-col items-center justify-center min-w-screen min-h-screen">
			{/* <div className="flex flex-col items-center w-auto"> */}
			<div
				className={`
                        cursor-pointer
                        duration-200
                        mb-2
                        border-b-2
                        border-transparent
                        hover:border-blue-400 
                    `}
			>
				<h1
					className={`text-3xl font-light`}
					onClick={() => history.push("/")}
				>
					CityPop
				</h1>
			</div>

			{children}
		</div>
		// </div>
	);
};

export default PageWrapper;
