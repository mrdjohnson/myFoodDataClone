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

  const { data: foodItemData } = await Axios.get(
    `https://us-central1-fasttripfinder-199123.cloudfunctions.net/my-food-data-proxy/?query=data-update-nf.php?name=${foodItemDataName}`
  );

  return (
    foodItemData && {
      ...foodItemData,
      id: foodItemData.ndbstring,
      name: foodItemData.names[0],
    }
  );
};
