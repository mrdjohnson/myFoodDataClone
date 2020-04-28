import React, { createContext, useState, useEffect } from "react";
import Axios from "axios";

import hamburgerExample from "./fixtures/hamburger.json";
import formatFoodItemData, {
  calculateNutritionalFactTable,
} from "./util/format_food_item_data";

const AppContext = createContext();

const { Provider } = AppContext;

// This context provider is passed to any component requiring the context
export const AppProvider = ({ children }) => {
  const [foodItemData, setFoodItemData] = useState();

  useEffect(() => {
    formatAndUpdateFoodItemData(hamburgerExample);
  }, []);

  function formatAndUpdateFoodItemData(fooItemData) {
    setFoodItemData(formatFoodItemData(fooItemData));
  }

  function fetchFoodItemData(foodItemName) {
    Axios.get(
      `https://tools.myfooddata.com/ajax/data-update-nf.php?name=${foodItemName}`,
      { headers: { "Access-Control-Allow-Origin": "*" } }
    ).then(({ data }) => {
      formatAndUpdateFoodItemData(data);
    });
  }

  function updateFoodItemDataNutritionFactTable({
    selectedQuantity = 1,
    selectedWeightIndex = 0,
  }) {
    const nutritionFactTable = calculateNutritionalFactTable(
      foodItemData,
      selectedQuantity,
      selectedWeightIndex
    );

    setFoodItemData({
      ...foodItemData,
      nutritionFactTable,
    });
  }

  const clearFoodItemData = () => setFoodItemData(null);

  return (
    <Provider
      value={{
        foodItemData,
        fetchFoodItemData,
        clearFoodItemData,
        updateFoodItemDataNutritionFactTable,
      }}
    >
      {children}
    </Provider>
  );
};

export default AppContext;
