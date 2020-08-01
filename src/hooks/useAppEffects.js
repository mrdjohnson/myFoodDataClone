import { useEffect } from "react";
import { useSetRecoilState, useResetRecoilState } from "recoil";

import { displayDrawerState } from "../recoil/displayDrawerState";
import {
  foodItemDataState,
  quantityWeightIndexState,
} from "../recoil/foodItemDataState";

import useUrlEffects from "./useUrlEffects";

import useAsyncRecoilValue from "./useAsyncRecoilValue";

import useQueryChangedEffects from "./useQueryChangedEffects";

export default function useAppEffects() {
  useUrlEffects();
  useQueryChangedEffects();

  const setDisplayDrawer = useSetRecoilState(displayDrawerState);
  const foodItemData = useAsyncRecoilValue(foodItemDataState);
  const resetQuantityWeightIndex = useResetRecoilState(
    quantityWeightIndexState
  );

  useEffect(() => {
    setDisplayDrawer(false);
    resetQuantityWeightIndex();
  }, [foodItemData]);
}
