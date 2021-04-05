import { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import {
  foodItemDataState,
  quantityWeightState,
  foodItemDataQueryStringState,
} from "../recoil/foodItemDataState";
import _ from "lodash";

export default function useUrlEffects() {
  const history = useHistory();
  const foodItemDataQueryString = useRecoilValue(foodItemDataQueryStringState);
  const foodItemData = useRecoilValue(foodItemDataState);
  const [quantityWeight, setQuantityWeight] = useRecoilState(
    quantityWeightState
  );

  // run when foodItemData changes
  useEffect(() => {
    if (foodItemData) {
      setQuantityWeight(getDefaultQuantityWeight(foodItemData));
    }
  }, [foodItemData]);

  // run when quantityWeight changes
  useEffect(() => {
    const pathname = foodItemDataQueryString;

    history.replace({ pathname });
  }, [quantityWeight]);
}

const getDefaultQuantityWeight = (foodItemData) => {
  const firstAvailableWeight = _.first(_.keys(foodItemData.servings));

  return {
    selectedWeight: firstAvailableWeight,
    selectedQuantity: 1,
  };
};
