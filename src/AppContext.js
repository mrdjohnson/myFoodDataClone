import React, { createContext, useState } from "react";
import Axios from "axios";

import appleExample from "./fixtures/apple.json";

const AppContext = createContext();

const { Provider } = AppContext;

// This context provider is passed to any component requiring the context
export const AppProvider = ({ children }) => {
  const [foodItemData, setFoodItemData] = useState({
    ...appleExample,
    name: "Apples",
  });

  const fetchFoodItemData = (foodItemName) => {
    Axios.get(
      `https://tools.myfooddata.com/ajax/data-update-nf.php?name=${foodItemName}`
    ).then(({ data }) => {
      setFoodItemData({ ...data, name: foodItemName });
    });
  };

  const clearFoodItemData = () => {
    setFoodItemData(null);
  };

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
