import React, { useState, useContext } from "react";

interface Props {
	children: React.ReactNode;
}

const SearchInputContext = React.createContext<string>("");
const SearchInputUpdateContext = React.createContext<Function>(
	(newCityName: string, newCityPopulation: number, newCityCountry: string) =>
		null
);

export const useSearchInput = () => {
	return useContext(SearchInputContext);
};

export const useSearchInputUpdate = () => {
	return useContext(SearchInputUpdateContext);
};

interface Props {
	children: React.ReactNode;
}

const SearchInputProvider: React.FC<Props> = ({ children }) => {
	const [searchInput, setSearchInput] = useState<string>("");

	const changeSearchInput = (newSearchInput: string) => {
		setSearchInput(newSearchInput);
	};

	return (
		<SearchInputContext.Provider value={searchInput}>
			<SearchInputUpdateContext.Provider value={changeSearchInput}>
				{children}
			</SearchInputUpdateContext.Provider>
		</SearchInputContext.Provider>
	);
};

export default SearchInputProvider;
