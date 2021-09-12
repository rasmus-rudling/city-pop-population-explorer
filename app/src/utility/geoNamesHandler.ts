const BASE_ENDPOINT_URL =
	"http://api.geonames.org/searchJSON?username=weknowit&";

interface geoNamesResponse {
	geonames: Array<geoNameObj>;
	totalResultsCount: number;
}

interface geoNameObj {
	adminCode1: string;
	adminCodes1: Object;
	adminName1: string;
	countryCode: string;
	countryId: string;
	countryName: string;
	fcl: string;
	fclName: string;
	fcode: string;
	fcodeName: string;
	geonameId: number;
	lat: string;
	lng: string;
	name: string;
	population: number;
}

export const GeoNamesAPI = {
	async apiCall(params: string) {
		return fetch(BASE_ENDPOINT_URL + params, {
			method: "GET",
		})
			.then((response) => {
				if (response.status === 200) {
					return response.json();
				} else {
					throw new Error(
						`Code "${response.status}" with the message "${response.statusText}"! :(`
					);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	},
	async getCountry(searchString: string) {
		let response: geoNamesResponse | undefined = await GeoNamesAPI.apiCall(
			`q=${searchString}&maxRows=10&fuzzy=0.8&orderby=[population]`
		);

		let country = response?.geonames.filter(
			(geoNameObj) => geoNameObj.countryName === geoNameObj.name
		)[0];

		if (country && country.population <= 0) {
			return undefined;
		} else {
			return country;
		}
	},
	async getCity(searchString: string) {
		let response: geoNamesResponse | undefined = await GeoNamesAPI.apiCall(
			`q=${searchString}&maxRows=10&fuzzy=0.8&orderby=[population]`
		);

		let city = response?.geonames.filter(
			(geoNameObj) => geoNameObj.fclName === "city, village,..."
		)[0];

		if (!city) {
			return undefined;
		} else if (city.population <= 0) {
			return `We found the city ${city.name} in ${city.countryName}. However, we don't have the info about its population.`;
		} else {
			return city;
		}
	},
};
