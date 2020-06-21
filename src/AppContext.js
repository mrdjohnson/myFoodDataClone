import React, { createContext, useEffect, useCallback } from "react";
import {
  useRecoilState,
  useSetRecoilState,
  useResetRecoilState,
  useRecoilValue,
} from "recoil";
import Axios from "axios";
import { useHistory } from "react-router-dom";

import { validQuantityWeightIndexFromQueryParams } from "./util/format_food_item_data";
import getQueryParamsFromHistory from "./util/getQueryParamsFromHistory";

import { displayDrawerState } from "./recoil/displayDrawerState";
import {
  foodItemDataNameState,
  foodItemDataState,
  quantityWeightIndexState,
  foodItemDataQueryStringState,
} from "./recoil/foodItemDataState";

const AppContext = createContext();

const { Provider } = AppContext;

export const AppProvider = ({ children }) => {
  const foodItemDataName = useRecoilValue(foodItemDataNameState);
  const setDisplayDrawer = useSetRecoilState(displayDrawerState);
  const [foodItemData, setFoodItemData] = useRecoilState(foodItemDataState);
  const [quantityWeightIndex, setQuantityWeightIndex] = useRecoilState(
    quantityWeightIndexState
  );
  const foodItemDataQueryString = useRecoilValue(foodItemDataQueryStringState);
  const resetQuantityWeightIndex = useResetRecoilState(
    quantityWeightIndexState
  );
  const resetFoodItemData = useResetRecoilState(foodItemDataState);
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

  // run when foodItemDataName changes
  useEffect(() => {
    fetchFoodItemData(foodItemDataName).then(resetQuantityWeightIndex);
  }, [foodItemDataName]);

  // run when foodItemData changes
  useEffect(() => {
    updateUrlWithFood(false);
  }, [foodItemData]);

  // run when quantityWeightIndex changes
  useEffect(() => {
    updateUrlWithFood(true);
  }, [quantityWeightIndex]);

  function fetchFoodItemData(foodItemName) {
    setDisplayDrawer(false);

    return Axios.get(
      `https://us-central1-fasttripfinder-199123.cloudfunctions.net/my-food-data-proxy/?query=data-update-nf.php?name=${foodItemName}`
    ).then(({ data }) => {
      setFoodItemData(data);

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
          setQuantityWeightIndex(
            validQuantityWeightIndexFromQueryParams(
              foodItemData,
              servingWeight,
              quantity
            )
          );
        };

        fetchFoodItemData(foodName, false).then(
          updateFoodItemDataWithQueryParams
        );
      }
    );
  }

  const updateUrlWithFood = useCallback(
    (replaceHistory) => {
      const queryString = foodItemDataQueryString;

      if (replaceHistory) {
        history.replace(queryString);
      } else {
        history.push(queryString);
      }
    },
    [foodItemDataQueryString, history]
  );

  return <Provider>{children}</Provider>;
};

export default AppContext;
