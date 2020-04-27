import React, { createContext, useState, useEffect } from "react";
import Axios from "axios";

import appleExample from "./fixtures/apple.json";
import formatFoodItemData from "./util/format_food_item_data";

const AppContext = createContext();

const { Provider } = AppContext;

// This context provider is passed to any component requiring the context
export const AppProvider = ({ children }) => {
  const [foodItemData, setFoodItemData] = useState();

  useEffect(() => {
    formatAndUpdateFoodItemData(appleExample);
  }, []);

  function formatAndUpdateFoodItemData(fooItemData) {
    setFoodItemData(formatFoodItemData(fooItemData));
  }

  function fetchFoodItemData(foodItemName) {
    Axios.get(
      `https://tools.myfooddata.com/ajax/data-update-nf.php?name=${foodItemName}`
    ).then(({ data }) => {
      formatAndUpdateFoodItemData(data);
    });
  }

  const clearFoodItemData = () => setFoodItemData(null);

  return (
    <Provider
      value={{
        foodItemData,
        fetchFoodItemData,
        clearFoodItemData,
      }}
    >
      {children}
    </Provider>
  );
};

export default AppContext;
