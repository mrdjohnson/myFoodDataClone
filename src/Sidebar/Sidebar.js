import React, { useState, useContext } from "react";
import AppContext from "../AppContext";

import { Layout, Select } from "antd";
import SidebarFoodList from "./SidebarFoodList";

import Axios from "axios";
import _ from "lodash";

import "./Sidebar.scss";

const { Option } = Select;

function Sidebar() {
  const [searchValue, setSearchValue] = useState();
  const [foodItems, setFoodItems] = useState([]);

  const { fetchFoodItemData } = useContext(AppContext);

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

  const updateSearchedValue = (searchedFoodItem) => {
    console.log("selected: ", searchedFoodItem);

    if (_.isEmpty(searchedFoodItem)) {
      setSearchValue(undefined);
    } else {
      setSearchValue(searchedFoodItem);
      fetchFoodItemData(searchedFoodItem);
    }
  };

  const renderHighlightedFoodItem = (foodItem) => {
    return (
      <Option key={foodItem}>
        {foodItemWithHighlights(foodItem, searchValue)}
      </Option>
    );
  };

  return (
    <Layout className="sidebar">
      <Select
        allowClear
        showSearch
        showArrow={false}
        value={searchValue}
        placeholder="🔍 Find Another Food"
        notFoundContent={false}
        filterOption={false}
        onSearch={searchFoodItems}
        onChange={updateSearchedValue}
        className="sidebar-searchbar"
      >
        {foodItems.map(renderHighlightedFoodItem)}
      </Select>
      <SidebarFoodList />
    </Layout>
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

export default Sidebar;
