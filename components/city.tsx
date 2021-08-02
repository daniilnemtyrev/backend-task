import React from "react";
import { useRouter } from "next/dist/client/router";
import { ICity } from "../interfaces/interfaces";

export const City = ({id, name, country_id}:ICity) => {
  const router = useRouter();
  return (
    <li>
        <span>
          {name}
        </span>
    </li>
  );
}