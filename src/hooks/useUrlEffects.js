import { useEffect, useCallback } from "react";
import { useRecoilValue } from "recoil";
import { useHistory } from "react-router-dom";
import {
  foodItemDataState,
  quantityWeightIndexState,
  foodItemDataQueryStringState,
} from "../recoil/foodItemDataState";

export default function useUrlEffects() {
  const history = useHistory();
  const foodItemDataQueryString = useRecoilValue(
    foodItemDataQueryStringState
  ); // /?food=171688&serv=wt2&qty=12
  const foodItemData = useRecoilValue(foodItemDataState);
  const quantityWeightIndex = useRecoilValue(quantityWeightIndexState);

  // run when foodItemData changes
  useEffect(() => {
    updateUrlWithFood(false);
  }, [foodItemData]);

  // run when quantityWeightIndex changes
  useEffect(() => {
    updateUrlWithFood(true);
  }, [quantityWeightIndex]);

  const updateUrlWithFood = useCallback(
    (replaceHistory) => {
      // todo do I need this?
      if (!foodItemDataQueryString) return;

      const queryString = foodItemDataQueryString;


      if (replaceHistory) {
        history.replace(queryString);
      } else {
        history.push(queryString);
      }
    },
    [foodItemDataQueryString, history]
  );
}
