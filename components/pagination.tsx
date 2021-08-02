import React from "react";
import { IPagination } from "../interfaces/interfaces";
import styles from "../styles/Home.module.css";

export const Pagination = ({citiesAmount, totalCities, paginate}:IPagination) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCities/ citiesAmount); i++) {
      pageNumbers.push(i);
  }

  return (
        <div className={styles.addMargin}>
            <ul className="pagination">{
            pageNumbers.map(number => (
                <li className="page-item" key={number}>
                <a className="page-link" onClick={() => paginate(number)}>
                    {number}
                </a>
                </li>
            ))
}
            </ul>
        </div>
  );
}