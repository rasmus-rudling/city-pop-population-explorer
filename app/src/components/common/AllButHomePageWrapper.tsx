import React from "react";
import { useHistory } from "react-router";

// interface Props {}

const AllButHomePageWrapper: React.FC = ({ children }) => {
	return <div className="w-60 h-32 text-center">{children}</div>;
};

export default AllButHomePageWrapper;
