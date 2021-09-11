import React, { useState } from "react";
import { useHistory } from "react-router";
import { GeoNamesAPI } from "../../utility/geoNamesHandler";
import Button1 from "../common/Button1";
import Button2 from "../common/Button2";
import TextInput from "../common/form/TextInput";

const SearchByCityPage = () => {
	const history = useHistory();

	const errorMsgs = {
		noCityFound:
			"Unfortunately, we can't find the city you're searching for.",
	};

	const [currentCityInput, setCurrentCityInput] = useState<string>("");

	// const [errorMsg, setErrorMsg] = useState(errorMsgs.noCityFound);
	const [errorMsg, setErrorMsg] = useState("");

	const submitSearchHandler = async () => {
		let city = await GeoNamesAPI.getCity(currentCityInput);
		console.log(city);
		setCurrentCityInput("");
	};

	return (
		<>
			<h3 className="text-xl font-light mt-2 mb-3">SEARCH BY CITY</h3>
			<div className="divide-y divide-black">
				<div className="mb-2">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							submitSearchHandler();
						}}
					>
						<TextInput
							currentText={currentCityInput}
							name="Search-by-country"
							onTextChange={(newCurrentCitySearch: string) => {
								setCurrentCityInput(newCurrentCitySearch);
							}}
							color="blue"
							placeholder="Enter a city"
						/>

						<Button2
							extraClasses="w-full mt-2"
							color="blue"
							onClick={() => {}}
							text="Search"
							type="submit"
							icon="search"
						/>
					</form>

					<p className={`text-red-500 mt-2`}>{errorMsg}</p>
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
