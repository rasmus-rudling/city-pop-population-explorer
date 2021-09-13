import React, { useState } from "react";
import { useHistory } from "react-router";
import {
	useSearchInput,
	useSearchInputUpdate,
} from "../../contexts/SearchInputContext";
import { useSelectedCityUpdate } from "../../contexts/SelectedCityContext";
import { GeoNamesAPI } from "../../utility/geoNamesHandler";
import Button1 from "../common/Button1";
import Button2 from "../common/Button2";
import TextInput from "../common/form/TextInput";

const SearchByCityPage = () => {
	const history = useHistory();
	const selectedCityUpdate = useSelectedCityUpdate();
	const searchInput = useSearchInput();
	const searchInputUpdate = useSearchInputUpdate();

	const errorMsgs = {
		noCityFound:
			"Unfortunately, we can't find the city you were searching for.",
	};

	const infoMsgs = {
		longRequest:
			"The request is taking longer than expected. Try refreshing your browser.",
	};

	const [isLoading, setIsLoading] = useState(false);

	const [errorMsg, setErrorMsg] = useState("");
	const [infoMsg, setInfoMsg] = useState("");
	const [showInfo, setShowInfo] = useState(true);

	const submitSearchHandler = async () => {
		setShowInfo(true);

		setErrorMsg("");
		setInfoMsg("");
		setIsLoading(true);

		setTimeout(() => {
			setInfoMsg(infoMsgs.longRequest);
		}, 7500);

		let cityResponse = await GeoNamesAPI.getCity(searchInput);

		setShowInfo(false);

		if (!cityResponse) {
			setErrorMsg(errorMsgs.noCityFound);
		} else {
			if (typeof cityResponse === "string") {
				setErrorMsg(cityResponse);
			} else {
				selectedCityUpdate(
					cityResponse.name,
					cityResponse.population,
					cityResponse.countryName
				);
				history.push("/population_result_page");
			}
		}
		setIsLoading(false);
		searchInputUpdate("");
	};

	return (
		<>
			<h3 className="text-xl font-light mt-2 mb-3">SEARCH BY CITY</h3>
			<div className="divide-y divide-black">
				<div className="mb-2">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							if (searchInput.length !== 0 && !isLoading) {
								submitSearchHandler();
							}
						}}
					>
						<TextInput
							currentText={searchInput}
							name="Search-by-country"
							onTextChange={(newCurrentCitySearch: string) => {
								searchInputUpdate(newCurrentCitySearch);
							}}
							color="blue"
							placeholder="Enter a city"
						/>

						<Button2
							extraClasses="mt-2 mx-auto"
							color="blue"
							btnOnClick={() => {}}
							text="Search"
							type="submit"
							icon="search"
							isLoading={isLoading}
							disabled={searchInput.length === 0}
						/>
					</form>

					<p className={`text-red-500 mt-2`}>{errorMsg}</p>

					{showInfo ? (
						<p className={`text-yellow-600 mt-2`}>{infoMsg}</p>
					) : null}
				</div>

				<div>
					<Button1
						extraClasses="w-full mt-2"
						color="green"
						onClick={() => history.push("search_by_country")}
						text="Search by country"
					/>
				</div>
			</div>
		</>
	);
};

export default SearchByCityPage;
