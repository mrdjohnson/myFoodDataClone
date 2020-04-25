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
  const [noContent, setNoContent] = useState(false);

  const { fetchFoodItemData } = useContext(AppContext);

  const searchFoodItems = _.debounce((foodSearchString) => {
    setFoodItems([]);

    if (_.isEmpty(foodSearchString)) {
      setSearchValue(undefined);
      setNoContent(false);
      return;
    }

    Axios.get(
      `https://tools.myfooddata.com/ajax/name-suggest.php?q=${foodSearchString}`
    ).then(({ data }) => {
      const foodResponseItems = data.trim().split(",");

      setSearchValue(foodSearchString);
      setFoodItems(foodResponseItems);
      setNoContent(foodSearchString && _.isEmpty(foodResponseItems));
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
        notFoundContent={noContent}
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
  const saltedFoodItem = _.replace(
    foodItem.trim(),
    new RegExp(substringToHighlight, "gi"),
    (text) => `<=>${text}<=>`
  );

  const splitText = saltedFoodItem.split("<=>");
  let isHighlighting = false;

  return splitText.map((substring) => {
    let foodItemOptionPart;

    if (isHighlighting) {
      foodItemOptionPart = <span className="highlighted">{substring}</span>;
    } else {
      foodItemOptionPart = substring;
    }

    isHighlighting = !isHighlighting;
    return foodItemOptionPart;
  });
}

export default Sidebar;
