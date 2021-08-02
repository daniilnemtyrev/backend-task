import React from "react";
import { ICountry } from "../interfaces/interfaces";

export const CountryTwo = ({ id, name }: ICountry) => {
  return <option value={id}>{name}</option>;
};
