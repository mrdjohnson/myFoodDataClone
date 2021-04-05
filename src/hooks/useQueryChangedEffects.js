import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useRouteMatch } from "react-router-dom";

import useSetFoodItemDataName from "../hooks/useSetFoodItemDataName";

import { quantityWeightState } from "../recoil/foodItemDataState";

export default function useQueryChangedEffects() {
  const setQuantityWeight = useSetRecoilState(quantityWeightState);
  const setFoodItemDataName = useSetFoodItemDataName();

  const {
    params: { foodName, weight, quantity },
  } = useRouteMatch();

  useEffect(() => {
    setFoodItemDataName(foodName);
  }, [foodName]);

  useEffect(() => {
    setQuantityWeight({
      selectedQuantity: Number(quantity),
      selectedWeight: weight,
    });
  }, []);
}
