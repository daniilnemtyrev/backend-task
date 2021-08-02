import { ChangeEvent, useEffect, useState } from "react";
import { ICountry } from "../interfaces/interfaces";
import { CountryTwo } from "./countryTwo";
import { ICity } from "../interfaces/interfaces";
import { City } from "./city";
import { Pagination } from "./pagination";
import styles from "../styles/Home.module.css"

export const CountriesListThree = () => {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [countriesID, setCountriesID] = useState(0);
  const [cities, setCities] = useState<ICity[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [citiesAmount] = useState(5);

  const getCountries = async () => {
    let response = await fetch("https://fathomless-citadel-61313.herokuapp.com/countries");
    let data = await response.json();
    setCountries(data);
  };

  const getCities = async (id: number) => {
    let response = await fetch(`https://fathomless-citadel-61313.herokuapp.com/cities/${id}`);
    let data = await response.json();
    setCities(data);
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    getCities(countriesID);
  }, [countriesID]);

  const changeCountry = (e: ChangeEvent<HTMLSelectElement>) => {
    setCountriesID(Number(e.target.value));
  };

  const lastCityIndex = currentPage * citiesAmount;
  const firstCityIndex = lastCityIndex - citiesAmount;
  const currenCities = cities.slice(firstCityIndex, lastCityIndex);

  const paginate = (currentPageNumber: number) => {
    setCurrentPage(currentPageNumber);
  };

  return (
    <>
      <h4>Страна</h4>
      <select onChange={changeCountry} className={styles.addMargin}>
        {countries.map(({ id, name, coord_country }) => {
          return (
            <CountryTwo
              key={id}
              id={id}
              name={name}
              coord_country={coord_country}
            />
          );
        })}
      </select>
      <h5>Города выбранной страны</h5>
      <ul>
        {currenCities.map(({ id, name, country_id, coord_cities }) => {
          return (
            <City
              key={id}
              id={id}
              name={name}
              country_id={country_id}
              coord_cities={coord_cities}
            />
          );
        })}
      </ul>
      <Pagination
        citiesAmount={citiesAmount}
        totalCities={cities.length}
        paginate={paginate}
      />
    </>
  );
};
