import React, { useState } from "react";

import { Select } from "antd";

import useSetFoodItemDataName from "../hooks/useSetFoodItemDataName";

import Axios from "axios";
import _ from "lodash";

import "./Searchbar.scss";

const { Option } = Select;

function Searchbar({ placeholder = "🔍 Find Another Food" }) {
  const [searchValue, setSearchValue] = useState();
  const [foodItems, setFoodItems] = useState([]);

  const setFoodItemDataName = useSetFoodItemDataName();

  const searchFoodItems = _.debounce((foodSearchString) => {
    setFoodItems([]);

    if (_.isEmpty(foodSearchString)) {
      setSearchValue(undefined);
      return;
    }

    Axios.get(
      `https://us-central1-fasttripfinder-199123.cloudfunctions.net/my-food-data-proxy/?query=name-suggest.php?q=${foodSearchString}`
    ).then(({ data }) => {
      const foodResponseItems = data.trim().split(",");

      setSearchValue(foodSearchString);
      setFoodItems(foodResponseItems.map(_.trim));
    });
  }, 300);

  function updateSearchedValue(searchedFoodItem) {
    console.log("selected: ", searchedFoodItem);

    if (_.isEmpty(searchedFoodItem)) {
      setSearchValue(undefined);
    } else {
      setSearchValue(searchedFoodItem);
      setFoodItemDataName(searchedFoodItem);
    }
  }

  const renderHighlightedFoodItem = (foodItem) => {
    return (
      <Option key={foodItem}>
        {foodItemWithHighlights(foodItem, searchValue)}
      </Option>
    );
  };

  return (
    <Select
      allowClear
      showSearch
      showArrow={false}
      value={searchValue}
      placeholder={placeholder}
      notFoundContent={false}
      filterOption={false}
      onSearch={searchFoodItems}
      onChange={updateSearchedValue}
      className="searchbar"
    >
      {foodItems.map(renderHighlightedFoodItem)}
    </Select>
  );
}

function foodItemWithHighlights(foodItem, substringToHighlight) {
  const caseInsensitiveGlobalSearch = new RegExp(substringToHighlight, "ig");
  const saltedFoodItem = _.replace(
    foodItem,
    caseInsensitiveGlobalSearch,
    (text) => `<=>${text}<=>`
  );

  const splitText = saltedFoodItem.split("<=>");

  return splitText.map((substring, index) => {
    const isHighlighting = index % 2 === 1;

    if (isHighlighting) {
      return (
        <span key={index} className="highlighted">
          {substring}
        </span>
      );
    }

    return substring;
  });
}

export default Searchbar;
