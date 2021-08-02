export interface IChildren {
	children: JSX.Element
}

export interface ICountry {
	id: number
	name: string
	coord_country: string
}

export interface ICity {
	id: number
	name: string
	country_id: number
	coord_cities: string
}

export interface IPagination {
	 citiesAmount: number
	 totalCities: number
	 paginate: ((number: number) => void)
}

