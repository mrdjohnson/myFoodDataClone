import React from "react";

import Searchbar from "./Searchbar/Searchbar";

import "./HomePage.scss";

export default function HomePage({ className }) {
  return (
    <div class={`${className} home-page`}>
      <h1 class="home-header">Nutrition Facts Search Tool</h1>
      <div class="home-info-how-to-search-line">
        Use the search box to find a food and see the nutrient details.
      </div>
      <div className="searchbar-container">
        <Searchbar placeholder="🔍 Search For A Food (Apples)" />
      </div>
    </div>
  );
}
