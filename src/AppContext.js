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
  const [isMobile, setIsMobile] = useState(false);
  const [displayDrawer, setDisplayDrawer] = useState(false);

  useEffect(() => {
    formatAndUpdateFoodItemData(hamburgerExample);
  }, []);

  function formatAndUpdateFoodItemData(fooItemData) {
    setFoodItemData(formatFoodItemData(fooItemData));
  }

  function fetchFoodItemData(foodItemName) {
    setDisplayDrawer(false);

    Axios.get(
      `https://us-central1-fasttripfinder-199123.cloudfunctions.net/my-food-data-proxy/?query=data-update-nf.php?name=${foodItemName}`
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
        updateFoodItemDataNutritionFactTable,

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
