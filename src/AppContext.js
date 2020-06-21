import React, { createContext, useEffect } from "react";
import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
import Axios from "axios";
import { useHistory } from "react-router-dom";

import formatFoodItemData, {
  formatFoodItemDataFromQueryParams,
} from "./util/format_food_item_data";
import getQueryParamsFromHistory from "./util/getQueryParamsFromHistory";

import { displayDrawerState } from "./recoil/displayDrawerState";
import {
  foodItemDataState,
  quantityWeightIndexState,
} from "./recoil/foodItemDataState";

const AppContext = createContext();

const { Provider } = AppContext;

const DEFAULT_SELECTED = { selectedQuantity: 1, selectedWeightIndex: 0 };

const UrlUpdateStrategy = { REPLACE: "REPLACE", PUSH: "PUSH", NONE: "NONE" };

export const AppProvider = ({ children }) => {
  const setDisplayDrawer = useSetRecoilState(displayDrawerState);
  const [foodItemData, setFoodItemData] = useRecoilState(foodItemDataState);
  const [quantityWeightIndex, setQuantityWeightIndex] = useRecoilState(
    quantityWeightIndexState
  );
  const resetFoodItemData = useResetRecoilState(foodItemDataState);
  const resetQuantityWeightIndex = useResetRecoilState(
    quantityWeightIndexState
  );
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
    shouldResetSelected = true,
    urlUpdateStrategy = UrlUpdateStrategy.PUSH
  ) {
    setDisplayDrawer(false);

    if (shouldResetSelected) {
      resetQuantityWeightIndex();
    }

    return Axios.get(
      `https://us-central1-fasttripfinder-199123.cloudfunctions.net/my-food-data-proxy/?query=data-update-nf.php?name=${foodItemName}`
    ).then(({ data }) => {
      formatAndUpdateFoodItemData(
        foodItemDataWithDefaultSelected(data),
        urlUpdateStrategy
      );
      return data;
    });
  }

  function updateFoodItemDataFromQueryParams() {
    return getQueryParamsFromHistory(history).then(
      ({ foodName, servingWeight, quantity }) => {
        if (!foodName) {
          resetFoodItemData();
          return;
        }

        const updateFoodItemDataWithQueryParams = (foodItemData) => {
          const foodItemDataWithQueryParams = formatFoodItemDataFromQueryParams(
            foodItemData,
            servingWeight,
            quantity
          );

          formatAndUpdateFoodItemData(foodItemDataWithQueryParams);
        };

        fetchFoodItemData(foodName, false, UrlUpdateStrategy.NONE).then(
          updateFoodItemDataWithQueryParams
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

  const clearFoodItemData = () => resetFoodItemData();

  return (
    <Provider
      value={{
        foodItemData,
        fetchFoodItemData,
        clearFoodItemData,

        updateFoodWithSelectedQuantity,
        updateFoodWithSelectedWeight,
      }}
    >
      {children}
    </Provider>
  );
};

export default AppContext;
