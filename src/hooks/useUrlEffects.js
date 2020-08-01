import { useEffect, useCallback } from "react";
import { useRecoilValue } from "recoil";
import { useHistory } from "react-router-dom";
import {
  foodItemDataState,
  quantityWeightIndexState,
  foodItemDataQueryStringState,
} from "../recoil/foodItemDataState";

import useAsyncRecoilValue from "../hooks/useAsyncRecoilValue";

export default function useUrlEffects() {
  const history = useHistory();
  const foodItemDataQueryString = useAsyncRecoilValue(
    foodItemDataQueryStringState
  ); // /?food=171688&serv=wt2&qty=12
  const foodItemData = useAsyncRecoilValue(foodItemDataState);
  const quantityWeightIndex = useRecoilValue(quantityWeightIndexState);

  // run when foodItemData changes
  useEffect(() => {
    console.log("foodItemData changed", foodItemData && foodItemData.name);
    updateUrlWithFood(false);
  }, [foodItemData]);

  // run when quantityWeightIndex changes
  useEffect(() => {
    console.log(
      "quantityWeightIndex changed",
      foodItemData && foodItemData.name
    );
    updateUrlWithFood(true);
  }, [quantityWeightIndex]);

  const updateUrlWithFood = useCallback(
    (replaceHistory) => {
      // todo do I need this?
      if (!foodItemDataQueryString) return;

      const queryString = foodItemDataQueryString;

      console.log(
        "queryString:",
        queryString,
        "replaceHistory:",
        replaceHistory
      );

      if (replaceHistory) {
        history.replace(queryString);
        console.log("history : replaced");
      } else {
        history.push(queryString);
        console.log("history : pushed");
      }
    },
    [foodItemDataQueryString, history]
  );
}
