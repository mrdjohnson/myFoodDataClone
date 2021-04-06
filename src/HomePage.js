import React from "react";

import Searchbar from "./Searchbar/Searchbar";

import "./HomePage.scss";

export default function HomePage({ className }) {
  return (
    <div className={`${className} home-page`}>
      <h1 className="home-header">Nutrition Facts Search Tool</h1>
      <div className="home-info-how-to-search-line">
        Use the search box to find a food and see the nutrient details.
      </div>
      <Searchbar placeholder="🔍 Search For A Food (Apples)" />
    </div>
  );
}
