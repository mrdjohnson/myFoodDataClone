import React, { createContext, useState, useEffect, useCallback } from "react";
import Axios from "axios";

import sugarAppleExample from "./fixtures/sugar_apple.json";
import formatFoodItemData from "./util/format_food_item_data";
import useQueryParams from "./util/useQueryParams";
import useInitialFoodName from "./util/useInitialFoodName";
import weightIndexFromServingWeight from "./util/weight_index_from_serving_weight";

import _ from "lodash";

const AppContext = createContext();

const { Provider } = AppContext;

const DEFAULT_SELECTED = { selectedQuantity: 1, selectedWeightIndex: 0 };

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 10000;

// This context provider is passed to any component requiring the context
export const AppProvider = ({ children }) => {
  const { servingWeight, quantity } = useQueryParams();
  const [foodItemData, setFoodItemData] = useState();
  const [isMobile, setIsMobile] = useState(false);
  const [displayDrawer, setDisplayDrawer] = useState(false);
  const initialFoodName = useInitialFoodName();

  const fetchFoodItemData = useCallback(
    (foodItemName, formatResponse = foodItemDataWithDefaultSelected) => {
      setDisplayDrawer(false);

      Axios.get(
        `https://us-central1-fasttripfinder-199123.cloudfunctions.net/my-food-data-proxy/?query=data-update-nf.php?name=${foodItemName}`
      ).then(({ data }) => {
        formatAndUpdateFoodItemData(formatResponse(data));
      });
    },
    []
  );

  useEffect(() => {
    formatAndUpdateFoodItemData(
      foodItemDataWithDefaultSelected(sugarAppleExample)
    );
  }, []);

  useEffect(() => {
    if (!initialFoodName) return;

    function formatInitialData(initialItemData) {
      const selectedQuantity = validQuantity(quantity)
      const selectedWeightIndex = weightIndexFromServingWeight(
        initialItemData,
        servingWeight
      );

      return { ...initialItemData, selectedQuantity, selectedWeightIndex };
    }

    fetchFoodItemData(initialFoodName, formatInitialData);
  }, [initialFoodName, servingWeight, quantity, fetchFoodItemData]);

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

function validQuantity(quantity) {
  if (quantity >= MIN_QUANTITY && quantity <= MAX_QUANTITY) {
    return quantity;
  }

  return DEFAULT_SELECTED.selectedQuantity;
}

export default AppContext;
