import { ChangeEvent, useEffect, useState } from "react";
import { ICountry } from "../interfaces/interfaces";
import { ICity } from "../interfaces/interfaces";
import { City } from "./city";
import { Pagination } from "./pagination";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import styles from "../styles/Home.module.css";

export const CountriesListSeven = () => {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [countriesID, setCountriesID] = useState(-1);
  const [cities, setCities] = useState<ICity[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [citiesAmount] = useState(5);
  const [countryNameSearch, setCountryNameSearch] = useState<string>("");
  const [coordCounty, setCoordCountry] = useState<string>("");

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

  const lastCityIndex = currentPage * citiesAmount;
  const firstCityIndex = lastCityIndex - citiesAmount;
  const currenCities = cities.slice(firstCityIndex, lastCityIndex);

  const paginate = (currentPageNumber: number) => {
    setCurrentPage(currentPageNumber);
  };

  const searchCities = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCountryNameSearch(e.target.value);
    if (countryNameSearch.length > 1) {
      for (let id in countries) {
        if (
          countries[id].name
            .toLowerCase()
            .includes(countryNameSearch.toLowerCase())
        ) {
          setCountriesID(countries[id].id);
          setCoordCountry(countries[id].coord_country);
          break;
        }
      }
    }
  };

  return (
    <>
      <h4>Поиск</h4>
      <input
        className={styles.addMargin}
        type="text"
        min="1"
        max="20"
        required
        placeholder="Название страны..."
        value={countryNameSearch}
        onChange={searchCities}
      />

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

      <YMaps>
        <div>
          <Map
            width="800px"
            height="300px"
            state={{ center: coordCounty.split(" ").map(parseFloat), zoom: 4 }}
          >
            {currenCities.map((city) => (
              <Placemark
                key={city.id}
                geometry={city.coord_cities.split(" ").map(parseFloat)}
                properties={{
                  balloonContent: city.name,
                  iconCaption: city.name,
                }}
                modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
              />
            ))}
          </Map>
        </div>
      </YMaps>
    </>
  );
};
