import React, { useState, useContext } from "react";

import { City } from "../commonTypes";

interface Props {
	children: React.ReactNode;
}

const SelectedCityContext = React.createContext<City>({
	name: "",
	population: 0,
	country: "",
});
const SelectedCityUpdateContext = React.createContext<Function>(
	(newCityName: string, newCityPopulation: number, newCityCountry: string) =>
		null
);

export const useSelectedCity = () => {
	return useContext(SelectedCityContext);
};

export const useSelectedCityUpdate = () => {
	return useContext(SelectedCityUpdateContext);
};

interface Props {
	children: React.ReactNode;
}

const SelectedCityProvider: React.FC<Props> = ({ children }) => {
	const [selectedCity, setSelectedCity] = useState<City>({
		name: "",
		population: 0,
		country: "",
	});

	const changeSelectedCity = (
		newCityName: string,
		newCityPopulation: number,
		newCityCountry: string
	) => {
		setSelectedCity({
			name: newCityName,
			population: newCityPopulation,
			country: newCityCountry,
		});
	};

	return (
		<SelectedCityContext.Provider value={selectedCity}>
			<SelectedCityUpdateContext.Provider value={changeSelectedCity}>
				{children}
			</SelectedCityUpdateContext.Provider>
		</SelectedCityContext.Provider>
	);
};

export default SelectedCityProvider;
