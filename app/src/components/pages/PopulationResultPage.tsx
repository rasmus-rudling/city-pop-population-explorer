import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useSelectedCity } from "../../contexts/SelectedCityContext";
import { useSelectedCountryUpdate } from "../../contexts/SelectedCountryContext";
import { GeoNamesAPI } from "../../utility/geoNamesHandler";
import Button1 from "../common/Button1";
import Button2 from "../common/Button2";
import InfoDisplayer from "../common/InfoDisplayer";

const PopulationResultPage = () => {
	const city = useSelectedCity();
	const selectedCountryUpdate = useSelectedCountryUpdate();
	const history = useHistory();

	const numberWithSpaces = (x: string) =>
		x.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

	let cityNameSafe, cityPopulationSafe, cityCountrySafe;

	if (city) {
		cityNameSafe = city.name;
		cityPopulationSafe = numberWithSpaces(String(city.population));
		cityCountrySafe = city.country === "" ? "" : ", " + city.country;
	} else {
		cityNameSafe = "";
		cityPopulationSafe = numberWithSpaces("");
		cityCountrySafe = "";
	}

	const [isLoading, setIsLoading] = useState(false);

	const seeBiggestCitiesHandler = async () => {
		setIsLoading(true);
		let countryResponse = await GeoNamesAPI.getCountry(city.country);

		if (countryResponse && typeof countryResponse !== "string") {
			await selectedCountryUpdate(
				countryResponse.name,
				countryResponse.countryCode
			);
			history.push("/country_result_page");
		}

		setIsLoading(false);
	};

	useEffect(() => {
		// If population is zero, the user has been wrongly redirected to this page.
		if (city.population === 0) {
			history.push("/");
		}
	}, []);

	return (
		<>
			<h3 className="text-xl font-light mt-1 mb-1">
				{cityNameSafe.toUpperCase()} {cityCountrySafe.toUpperCase()}
			</h3>
			<div className="divide-y divide-black">
				<div className="mb-2">
					<InfoDisplayer
						typeOfInfo="Population"
						info={cityPopulationSafe}
					/>

					<Button2
						extraClasses="w-full mt-2"
						color="blue"
						btnOnClick={seeBiggestCitiesHandler}
						isLoading={isLoading}
						text={`Biggest cities in ${city.country}`}
					/>
				</div>

				<div>
					<Button1
						extraClasses="w-full mt-2"
						color="green"
						onClick={() => history.push("search_by_city")}
						text="Search by city"
					/>

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

export default PopulationResultPage;
