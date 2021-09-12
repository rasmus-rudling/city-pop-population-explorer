import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { City } from "../../commonTypes";
import { useSelectedCityUpdate } from "../../contexts/SelectedCityContext";
import { useSelectedCountry } from "../../contexts/SelectedCountryContext";
import Button1 from "../common/Button1";

const CountryResultPage = () => {
	const history = useHistory();
	const country = useSelectedCountry();
	const selectedCityUpdate = useSelectedCityUpdate();

	let countryNameSafe;

	if (country !== undefined && country.name !== undefined) {
		countryNameSafe = country.name;
	} else {
		countryNameSafe = "";
	}

	const cityClickHandler = (city: City) => {
		selectedCityUpdate(city.name, city.population, city.country);
		history.push("/population_result_page");
	};

	return (
		<>
			<h3 className="text-xl font-light mt-1 mb-1">
				{countryNameSafe.toUpperCase()}
			</h3>
			<div className="divide-y divide-black">
				<div className="mb-2">
					{country.biggestCities.map((city: City) => (
						<Button1
							extraClasses="w-full mt-2"
							color="blue"
							onClick={() => cityClickHandler(city)}
							text={city.name}
						/>
					))}
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

export default CountryResultPage;
