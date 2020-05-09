import React, { createContext, useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

import formatFoodItemData, {
  formatFoodItemDataFromQueryParams,
} from "./util/format_food_item_data";
import getQueryParamsFromHistory from "./util/getQueryParamsFromHistory";
import useIsMobile from "./util/useIsMobile";

const AppContext = createContext();

const { Provider } = AppContext;

const DEFAULT_SELECTED = { selectedQuantity: 1, selectedWeightIndex: 0 };

const UrlUpdateStrategy = { REPLACE: "REPLACE", PUSH: "PUSH", NONE: "NONE" };

export const AppProvider = ({ children }) => {
  const [foodItemData, setFoodItemData] = useState();
  const isMobile = useIsMobile()
  const [displayDrawer, setDisplayDrawer] = useState(false);
  const history = useHistory();

  // run on mount only
  useEffect(() => {
    // add listener to history for back button
    history.listen(() => {
      if (history.action === "POP") {
        updateFoodItemDataFromQueryParams();
      }
    });
  }, []);

  // run on mount only
  useEffect(() => {
    updateFoodItemDataFromQueryParams();
  }, []);

  function fetchFoodItemData(
    foodItemName,
    formatResponse = foodItemDataWithDefaultSelected,
    urlUpdateStrategy = UrlUpdateStrategy.PUSH
  ) {
    setDisplayDrawer(false);

    Axios.get(
      `https://us-central1-fasttripfinder-199123.cloudfunctions.net/my-food-data-proxy/?query=data-update-nf.php?name=${foodItemName}`
    ).then(({ data }) => {
      formatAndUpdateFoodItemData(formatResponse(data), urlUpdateStrategy);
    });
  }

  function updateFoodItemDataFromQueryParams() {
    return getQueryParamsFromHistory(history).then(
      ({ foodName, servingWeight, quantity }) => {
        if (!foodName) {
          setFoodItemData(null);
          return;
        }

        const formatFromQueryParams = (itemData) =>
          formatFoodItemDataFromQueryParams(itemData, servingWeight, quantity);

        fetchFoodItemData(
          foodName,
          formatFromQueryParams,
          UrlUpdateStrategy.NONE
        );
      }
    );
  }

  function foodItemDataWithDefaultSelected(foodItemData) {
    return { ...foodItemData, ...DEFAULT_SELECTED };
  }

  function formatAndUpdateFoodItemData(
    foodItemData,
    urlUpdateStrategy = UrlUpdateStrategy.REPLACE
  ) {
    const formattedFoodData = formatFoodItemData(foodItemData);

    setFoodItemData(formattedFoodData);
    updateUrlWithFood(formattedFoodData, urlUpdateStrategy);
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

  function updateUrlWithFood(foodItemData, urlUpdateStrategy) {
    const { id, selectedQuantity, selectedWeightIndex } = foodItemData;
    const servingCode = foodItemData.code_arr[selectedWeightIndex];

    const queryString = `?food=${id}&serv=${servingCode}&qty=${selectedQuantity}`;

    if (urlUpdateStrategy === UrlUpdateStrategy.REPLACE) {
      history.replace(queryString);
    } else if (urlUpdateStrategy === UrlUpdateStrategy.PUSH) {
      history.push(queryString);
    }
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

        displayDrawer,
        setDisplayDrawer,
      }}
    >
      {children}
    </Provider>
  );
};

export default AppContext;
