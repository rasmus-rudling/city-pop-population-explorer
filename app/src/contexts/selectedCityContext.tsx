import React, { useState, useContext, createContext } from "react";

const SelectedCity = createContext<City | null>(null);

const SelectedCityUpdateContext = createContext<Function>(() => {});

export const useSelectedCity = () => {
	return useContext(SelectedCity);
};

export const useSelectedCityUpdate = () => {
	return useContext(SelectedCityUpdateContext);
};

interface Props {
	children: React.ReactNode;
}

interface City {
	name: string;
	population: number;
}

const SelectedCityProvider: React.FC<Props> = ({ children }) => {
	const [selectedCity, setSelectedCity] = useState<City | null>(null);

	const changeSelectedCity = (
		newCityName: string,
		newCityPopulation: number
	) => {
		setSelectedCity({
			name: newCityName,
			population: newCityPopulation,
		});
	};

	return (
		<SelectedCity.Provider value={selectedCity}>
			<SelectedCityUpdateContext.Provider value={changeSelectedCity}>
				{children}
			</SelectedCityUpdateContext.Provider>
		</SelectedCity.Provider>
	);
};

export default SelectedCityProvider;
