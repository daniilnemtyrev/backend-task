import { useEffect, useState } from "react";
import { ICountry } from "../interfaces/interfaces";
import { Country } from "./country";

export const CountriesListOne = () => {
  const [countries, setCountries] = useState<ICountry[]>([]);

  const getCountries = async () => {
    let response = await fetch("https://fathomless-citadel-61313.herokuapp.com/countries");
    let data = await response.json();
    setCountries(data);
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <ul>
      {countries.map(({ id, name, coord_country }) => {
        return (
          <Country key={id} id={id} name={name} coord_country={coord_country} />
        );
      })}
    </ul>
  );
};
