export interface dictionary {
	[key: string]: any;
}

export interface City {
	name: string;
	population: number;
	country: string;
}

export interface Country {
	name: string;
	code: string;
	biggestCities: Array<City>;
}
