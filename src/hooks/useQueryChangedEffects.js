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
    updateFoodItemDataFromQueryParams();
  }, []);

  // run on mount only
  useEffect(() => {
  }, [foodItemQueryParams]);

  // run on mount only
  useEffect(() => {

    if (foodItemData && foodItemQueryParams.foodName === foodItemDataName) {
      const { servingWeight, quantity } = foodItemQueryParams;

      setQuantityWeightIndex(
        validQuantityWeightIndexFromQueryParams(
          foodItemData,
          servingWeight,
          quantity
        )
      );

      resetFoodItemQueryParams();
    }
  }, [foodItemQueryParams, foodItemData, foodItemDataName]);

  function updateFoodItemDataFromQueryParams() {
    return getQueryParamsFromHistory(history).then((queryParams) => {
      setFoodItemQueryParams(queryParams);

      setFoodItemDataName(queryParams.foodName);
    });
  }
}
