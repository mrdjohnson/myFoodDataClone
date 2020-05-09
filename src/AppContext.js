import React, { createContext, useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

import sugarAppleExample from "./fixtures/sugar_apple.json";
import formatFoodItemData, {
  formatFoodItemDataFromQueryParams,
} from "./util/format_food_item_data";

import getQueryParamsFromHistory from "./util/getQueryParamsFromHistory";

const AppContext = createContext();

const { Provider } = AppContext;

const DEFAULT_SELECTED = { selectedQuantity: 1, selectedWeightIndex: 0 };

export const AppProvider = ({ children }) => {
  const history = useHistory();
  const [foodItemData, setFoodItemData] = useState();
  const [isMobile, setIsMobile] = useState(false);
  const [displayDrawer, setDisplayDrawer] = useState(false);

  useEffect(() => {
    formatAndUpdateFoodItemData(
      foodItemDataWithDefaultSelected(sugarAppleExample)
    );
  }, []);

  // run on mount only
  useEffect(() => {
    updateFoodItemDataFromQueryParams();
  }, []);

  function fetchFoodItemData(
    foodItemName,
    formatResponse = foodItemDataWithDefaultSelected
  ) {
    setDisplayDrawer(false);

    Axios.get(
      `https://us-central1-fasttripfinder-199123.cloudfunctions.net/my-food-data-proxy/?query=data-update-nf.php?name=${foodItemName}`
    ).then(({ data }) => {
      formatAndUpdateFoodItemData(formatResponse(data));
    });
  }

  function updateFoodItemDataFromQueryParams() {
    return getQueryParamsFromHistory(history).then(
      ({ foodName, servingWeight, quantity }) => {
        if (!foodName) return;

        const formatFromQueryParams = (itemData) =>
          formatFoodItemDataFromQueryParams(itemData, servingWeight, quantity);

        fetchFoodItemData(foodName, formatFromQueryParams);
      }
    );
  }

  function foodItemDataWithDefaultSelected(foodItemData) {
    return { ...foodItemData, ...DEFAULT_SELECTED };
  }

  function formatAndUpdateFoodItemData(foodItemData) {
    setFoodItemData(formatFoodItemData(foodItemData));
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
