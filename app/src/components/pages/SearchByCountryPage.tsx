import React, { useState } from "react";
import { useHistory } from "react-router";
import { useSelectedCityUpdate } from "../../contexts/SelectedCityContext";
import { useSelectedCountryUpdate } from "../../contexts/SelectedCountryContext";
import { GeoNamesAPI } from "../../utility/geoNamesHandler";
import Button1 from "../common/Button1";
import Button2 from "../common/Button2";
import TextInput from "../common/form/TextInput";

const SearchByCountryPage = () => {
	const history = useHistory();
	const selectedCountryUpdate = useSelectedCountryUpdate();

	const errorMsgs = {
		noCountryFound:
			"Unfortunately, we can't find the country you're searching for.",
	};

	const [isLoading, setIsLoading] = useState(false);

	const [currentCountryInput, setCurrentCountryInput] = useState<string>("");

	const [errorMsg, setErrorMsg] = useState("");

	const submitSearchHandler = async () => {
		setErrorMsg("");
		setIsLoading(true);
		let countryResponse = await GeoNamesAPI.getCountry(currentCountryInput);
		setIsLoading(false);

		if (!countryResponse) {
			setErrorMsg(errorMsgs.noCountryFound);
		} else {
			if (typeof countryResponse === "string") {
				setErrorMsg(countryResponse);
			} else {
				selectedCountryUpdate(
					countryResponse.name,
					countryResponse.countryCode
				);
				history.push("/country_result_page");
			}
		}

		setCurrentCountryInput("");
	};

	return (
		<>
			<h3 className="text-xl font-light mt-2 mb-3">SEARCH BY COUNTRY</h3>
			<div className="divide-y divide-black">
				<div className="mb-2">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							if (currentCountryInput.length !== 0) {
								submitSearchHandler();
							}
						}}
					>
						<TextInput
							currentText={currentCountryInput}
							name="Search-by-country"
							onTextChange={(newCurrentCountrySearch: string) => {
								setCurrentCountryInput(newCurrentCountrySearch);
							}}
							color="blue"
							placeholder="Enter a country"
						/>

						<Button2
							extraClasses="mt-2 mx-auto"
							color="blue"
							btnOnClick={() => {}}
							text="Search"
							type="submit"
							icon="search"
							isLoading={isLoading}
							disabled={currentCountryInput.length === 0}
						/>
					</form>

					<p className={`text-red-500 mt-2`}>{errorMsg}</p>
				</div>

				<div>
					<Button1
						extraClasses="w-full mt-2"
						color="green"
						onClick={() => history.push("search_by_city")}
						text="Search by city"
					/>
				</div>
			</div>
		</>
	);
};

export default SearchByCountryPage;
