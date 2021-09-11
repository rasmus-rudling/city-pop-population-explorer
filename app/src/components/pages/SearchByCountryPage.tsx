import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useHistory } from "react-router";
import Button1 from "../common/Button1";
import Button2 from "../common/Button2";
import TextInput from "../common/form/TextInput";

const SearchByCountryPage = () => {
	const history = useHistory();

	const errorMsgs = {
		noCountryFound:
			"Unfortunately, we can't find the country you're searching for.",
	};

	const [currentCountryInput, setCurrentCountryInput] = useState<string>("");

	// const [errorMsg, setErrorMsg] = useState(errorMsgs.noCountryFound);
	const [errorMsg, setErrorMsg] = useState("");

	const submitSearchHandler = () => {
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
							submitSearchHandler();
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
						onClick={() => history.push("search_by_city")}
						text="Search by city"
					/>
				</div>
			</div>
		</>
	);
};

export default SearchByCountryPage;
