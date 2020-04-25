import React, { useState } from "react";

import { Layout, Select, Spin } from "antd";
import { Input } from "antd";

import Axios from "axios";

import _ from "lodash";

import "./Sidebar.scss";

const { Option } = Select;

function Sidebar() {
  const [searchValue, setSearchValue] = useState();
  const [foodItems, setFoodItems] = useState([]);
  const [noContent, setNoContent] = useState(false);

  const fetchFoodItem = _.debounce((foodSearchString) => {
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

  const updateSearchedValue = (value) => {
    setSearchValue(_.isEmpty(value) ? null : value);
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
        onSearch={fetchFoodItem}
        onChange={updateSearchedValue}
        className="sidebar-searchbar"
      >
        {foodItems.map(renderHighlightedFoodItem)}
      </Select>
    </Layout>
  );
}

function foodItemWithHighlights(foodItem, substringToHighlight) {
  const saltedFoodItem = _.replace(
    foodItem,
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
