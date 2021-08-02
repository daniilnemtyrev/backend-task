import { ChangeEvent, useEffect, useState } from "react";
import { ICountry } from "../interfaces/interfaces";
import { CountryTwo } from "./countryTwo";
import { ICity } from "../interfaces/interfaces";
import { City } from "./city";
import styles from "../styles/Home.module.css"

export const CountriesListTwo = () => {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [countriesID, setCountriesID] = useState<number>(0);
  const [cities, setCities] = useState<ICity[]>([]);

  const getCountries = async () => {
    let response = await fetch("http://localhost:4000/countries");
    let data = await response.json();
    setCountries(data);
  };

  const getCities = async (id: number) => {
    let response = await fetch(`http://localhost:4000/cities/${id}`);
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
        {cities.map(({ id, name, country_id, coord_cities }) => {
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
    </>
  );
};
