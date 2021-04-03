import { useSetRecoilState, useResetRecoilState } from "recoil";
import {
  foodItemDataState,
  quantityWeightIndexState,
} from "../recoil/foodItemDataState";
import { displayDrawerState } from "../recoil/displayDrawerState";
import Axios from "axios";

export default function useSetFoodItemDataName() {
  const setFoodItemData = useSetRecoilState(foodItemDataState);
  const setDisplayDrawer = useSetRecoilState(displayDrawerState);
  const resetQuantityWeightIndex = useResetRecoilState(
    quantityWeightIndexState
  );

  return (name) => {
    fetchAndAssignFoodItemData(name).then(setFoodItemData);

    setDisplayDrawer(false);
    resetQuantityWeightIndex();
  };
}

const fetchAndAssignFoodItemData = async (foodItemDataName) => {
  if (!foodItemDataName) return null;

  const { data } = await Axios.get(
    `https://us-central1-fasttripfinder-199123.cloudfunctions.net/my-food-data-search-proxy/?query=food/${foodItemDataName}`
  );

  const foodItemData = data[0];

  return (
    foodItemData && {
      ...foodItemData,
      id: foodItemData.ndbstring,
      name: foodItemData.name3,
    }
  );
};
