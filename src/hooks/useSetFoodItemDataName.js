import { useSetRecoilState } from "recoil";
import { foodItemDataState } from "../recoil/foodItemDataState";
import Axios from "axios";

export default function useSetFoodItemDataName() {
  const setFoodItemData = useSetRecoilState(foodItemDataState);

  return (name) => fetchAndAssignFoodItemData(name).then(setFoodItemData);
}

const fetchAndAssignFoodItemData = async (foodItemDataName) => {
  // return null;
  if (!foodItemDataName) return null;

  const { data: foodItemData } = await Axios.get(
    `https://us-central1-fasttripfinder-199123.cloudfunctions.net/my-food-data-proxy/?query=data-update-nf.php?name=${foodItemDataName}`
  );

  console.log("djjj got food item data, updating data", foodItemData);

  return (
    foodItemData && {
      ...foodItemData,
      id: foodItemData.ndbstring,
      name: foodItemData.names[0],
    }
  );
};
