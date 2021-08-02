import React from "react";
import { ICountry } from "../interfaces/interfaces";

export const Country = ({ id, name }: ICountry) => {
  return (
    <li>
      <span>{name}</span>
    </li>
  );
};
