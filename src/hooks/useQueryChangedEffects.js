import { useEffect } from "react";
import {
  useRecoilState,
  useSetRecoilState,
  useResetRecoilState,
  useRecoilValue,
} from "recoil";
import { useHistory } from "react-router-dom";

import { validQuantityWeightIndexFromQueryParams } from "../util/format_food_item_data";
import getQueryParamsFromHistory from "../util/getQueryParamsFromHistory";
import useSetFoodItemDataName from "../hooks/useSetFoodItemDataName";

import {
  foodItemQueryParamsState,
  foodItemDataNameState,
  foodItemDataState,
  quantityWeightIndexState,
} from "../recoil/foodItemDataState";

export default function useAppEffects() {
  const foodItemDataName = useRecoilValue(foodItemDataNameState);
  const setFoodItemDataName = useSetFoodItemDataName();
  const foodItemData = useRecoilValue(foodItemDataState);
  const [foodItemQueryParams, setFoodItemQueryParams] = useRecoilState(
    foodItemQueryParamsState
  );
  const resetFoodItemQueryParams = useResetRecoilState(
    foodItemQueryParamsState
  );
  const setQuantityWeightIndex = useSetRecoilState(quantityWeightIndexState);
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
    console.log("getting query params from mount");
    updateFoodItemDataFromQueryParams();
  }, []);

  // run on mount only
  useEffect(() => {
    console.log("foodItemQueryParams changed");
  }, [foodItemQueryParams]);

  // run on mount only
  useEffect(() => {
    console.log(
      "foodItemQueryParams or foodItemData updated: ",
      foodItemQueryParams,
      foodItemData
    );

    if (foodItemData && foodItemQueryParams.foodName === foodItemDataName) {
      const { servingWeight, quantity } = foodItemQueryParams;

      setQuantityWeightIndex(
        validQuantityWeightIndexFromQueryParams(
          foodItemData,
          servingWeight,
          quantity
        )
      );

      console.log("reseting foodItemQueryParams");
      resetFoodItemQueryParams();
    }
  }, [foodItemQueryParams, foodItemData, foodItemDataName]);

  function updateFoodItemDataFromQueryParams() {
    return getQueryParamsFromHistory(history).then((queryParams) => {
      console.log("got query params, setting foodItem query", queryParams);
      setFoodItemQueryParams(queryParams);

      console.log("setting name", queryParams.foodName);
      setFoodItemDataName(queryParams.foodName);
    });
  }
}
