import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useSelectedCity } from "../../contexts/SelectedCityContext";
import Button1 from "../common/Button1";
import InfoDisplayer from "../common/InfoDisplayer";

const PopulationResultPage = () => {
	const city = useSelectedCity();

	const history = useHistory();

	const numberWithSpaces = (x: string) =>
		x.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

	let cityNameSafe, cityPopulationSafe, cityCountrySafe;

	if (city) {
		cityNameSafe = city.name.toUpperCase();
		cityPopulationSafe = numberWithSpaces(String(city.population));
		cityCountrySafe = city.country === "" ? "" : ", " + city.country;
	} else {
		cityNameSafe = "";
		cityPopulationSafe = numberWithSpaces("");
		cityCountrySafe = "";
	}

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
