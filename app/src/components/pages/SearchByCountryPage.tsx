import React, { useState } from "react";
import { useHistory } from "react-router";
import {
	useSearchInput,
	useSearchInputUpdate,
} from "../../contexts/SearchInputContext";
import { useSelectedCountryUpdate } from "../../contexts/SelectedCountryContext";
import { GeoNamesAPI } from "../../utility/geoNamesHandler";
import Button1 from "../common/Button1";
import Button2 from "../common/Button2";
import TextInput from "../common/form/TextInput";

const SearchByCountryPage = () => {
	const history = useHistory();
	const selectedCountryUpdate = useSelectedCountryUpdate();
	const searchInput = useSearchInput();
	const searchInputUpdate = useSearchInputUpdate();

	const errorMsgs = {
		noCountryFound:
			"Unfortunately, we can't find the country you're searching for.",
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
		setIsLoading(true);

		setInfoMsg("");

		setTimeout(() => {
			setInfoMsg(infoMsgs.longRequest);
		}, 7500);

		let countryResponse = await GeoNamesAPI.getCountry(searchInput);

		setShowInfo(false);

		if (!countryResponse) {
			setErrorMsg(errorMsgs.noCountryFound);
		} else {
			if (typeof countryResponse === "string") {
				setErrorMsg(countryResponse);
			} else {
				await selectedCountryUpdate(
					countryResponse.name,
					countryResponse.countryCode
				);
				history.push("/country_result_page");
			}
		}
		setIsLoading(false);
		searchInputUpdate("");
	};

	return (
		<>
			<h3 className="text-xl font-light mt-2 mb-3">SEARCH BY COUNTRY</h3>
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
							onTextChange={(newCurrentCountrySearch: string) => {
								searchInputUpdate(newCurrentCountrySearch);
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
						onClick={() => history.push("search_by_city")}
						text="Search by city"
					/>
				</div>
			</div>
		</>
	);
};

export default SearchByCountryPage;
