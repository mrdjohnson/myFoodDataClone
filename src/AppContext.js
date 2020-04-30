import React, { createContext, useState, useEffect } from "react";
import Axios from "axios";

import sugarAppleExample from "./fixtures/sugar_apple.json";
import formatFoodItemData from "./util/format_food_item_data";

const AppContext = createContext();

const { Provider } = AppContext;

const DEFAULT_SELECTED = { selectedQuantity: 1, selectedWeightIndex: 0 };

// This context provider is passed to any component requiring the context
export const AppProvider = ({ children }) => {
  const [foodItemData, setFoodItemData] = useState();
  const [isMobile, setIsMobile] = useState(false);
  const [displayDrawer, setDisplayDrawer] = useState(false);

  useEffect(() => {
    formatAndUpdateFoodItemData(
      foodItemDataWithDefaultSelected(sugarAppleExample)
    );
  }, []);

  function foodItemDataWithDefaultSelected(foodItemData) {
    return { ...foodItemData, ...DEFAULT_SELECTED };
  }

  function formatAndUpdateFoodItemData(foodItemData) {
    setFoodItemData(formatFoodItemData(foodItemData));
  }

  function fetchFoodItemData(foodItemName) {
    setDisplayDrawer(false);

    Axios.get(
      `https://us-central1-fasttripfinder-199123.cloudfunctions.net/my-food-data-proxy/?query=data-update-nf.php?name=${foodItemName}`
    ).then(({ data }) => {
      formatAndUpdateFoodItemData(foodItemDataWithDefaultSelected(data));
    });
  }

  function updateFoodWithSelectedQuantity(foodItemData, selectedQuantity) {
    formatAndUpdateFoodItemData({
      ...foodItemData,
      selectedQuantity,
    });
  }

  function updateFoodWithSelectedWeight(foodItemData, selectedWeightIndex) {
    formatAndUpdateFoodItemData({
      ...foodItemData,
      selectedWeightIndex,
    });
  }

  function toggleMobile() {
    setIsMobile(!isMobile);
  }

  const clearFoodItemData = () => setFoodItemData(null);

  return (
    <Provider
      value={{
        foodItemData,
        fetchFoodItemData,
        clearFoodItemData,

        updateFoodWithSelectedQuantity,
        updateFoodWithSelectedWeight,

        isMobile,
        toggleMobile,

        displayDrawer,
        setDisplayDrawer,
      }}
    >
      {children}
    </Provider>
  );
};

export default AppContext;
