import { useSetRecoilState, useResetRecoilState } from "recoil";
import {
  foodItemDataState,
  quantityWeightState,
} from "../recoil/foodItemDataState";
import { displayDrawerState } from "../recoil/displayDrawerState";
import Axios from "axios";
import _ from "lodash";

export default function useSetFoodItemDataName() {
  const setFoodItemData = useSetRecoilState(foodItemDataState);
  const setDisplayDrawer = useSetRecoilState(displayDrawerState);
  const resetQuantityWeight = useResetRecoilState(
    quantityWeightState
  );

  return (name) => {
    fetchAndAssignFoodItemData(name).then(setFoodItemData);

    setDisplayDrawer(false);
    resetQuantityWeight();
  };
}

const fetchAndAssignFoodItemData = async (foodItemDataName) => {
  if (!foodItemDataName) return null;

  const { data } = await Axios.get(
    `https://us-central1-fasttripfinder-199123.cloudfunctions.net/my-food-data-search-proxy/?query=food/${foodItemDataName}`
  );

  const foodItemData = data[0];

  if (!foodItemData) return null;

  const servingSizes = JSON.parse(foodItemData.servingsizes);

  const servings = _.mapValues(servingSizes, ([weight, description]) => ({
    weight,
    description: `${description} (${weight}g)`,
  }));

  return {
    ...foodItemData,
    id: foodItemData.ndbstring,
    name: foodItemData.name3,
    servings,
  };
};
