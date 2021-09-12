import React, { useState, useContext } from "react";

import { Country } from "../commonTypes";
import { GeoNamesAPI } from "../utility/geoNamesHandler";

interface Props {
	children: React.ReactNode;
}

const SelectedCountryContext = React.createContext<Country>({
	name: "",
	code: "",
	biggestCities: [],
});
const SelectedCountryUpdateContext = React.createContext<Function>(
	(newCountryName: string, newbiggestCities: Array<string>) => null
);

export const useSelectedCountry = () => {
	return useContext(SelectedCountryContext);
};

export const useSelectedCountryUpdate = () => {
	return useContext(SelectedCountryUpdateContext);
};

interface Props {
	children: React.ReactNode;
}

const SelectedCountryProvider: React.FC<Props> = ({ children }) => {
	const [selectedCountry, setSelectedCountry] = useState<Country>({
		name: "",
		code: "",
		biggestCities: [],
	});

	const changeSelectedCountry = async (
		newCountryName: string,
		newCountryCode: string
	) => {
		let newBiggestCitiesRespons = await GeoNamesAPI.getCitiesFromCountry(
			newCountryCode
		);

		let newBiggestCities = newBiggestCitiesRespons?.map((city) => {
			return {
				name: city.name,
				population: city.population,
				country: newCountryName,
			};
		});

		if (!newBiggestCities) {
			newBiggestCities = [];
		}

		setSelectedCountry({
			name: newCountryName,
			code: newCountryCode,
			biggestCities: newBiggestCities,
		});
	};

	return (
		<SelectedCountryContext.Provider value={selectedCountry}>
			<SelectedCountryUpdateContext.Provider
				value={changeSelectedCountry}
			>
				{children}
			</SelectedCountryUpdateContext.Provider>
		</SelectedCountryContext.Provider>
	);
};

export default SelectedCountryProvider;
