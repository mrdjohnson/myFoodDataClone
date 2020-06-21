import { atom, selector } from "recoil";
import formatFoodItemData, {
  formatFoodItemDataFromQueryParams,
  calculateNutritionalFactTable
} from "../util/format_food_item_data";

export const foodItemDataState = atom({
  key: "foodItemDataState",
  default: null
});

export const quantityWeightIndexState = atom({
  key: "quantityWeightIndexState",
  default: {
    selectedQuantity: 1,
    selectedWeightIndex: 0
  }
})

const foodItemDataWithSelectedState = selector({
  key: 'foodItemDataWithSelectedState',
  get: ({get}) => {
    const foodItemData = get(foodItemDataState)
    const selectedQuantityWeightIndex = get(quantityWeightIndexState)

    return {
      ...foodItemData,
      ...selectedQuantityWeightIndex
    }
  }
})

export const foodItemDataNutritionFacts = selector({
  key: 'foodItemDataNutritionFactsSelector',
  get: ({get}) => {
    const foodItemDataWithSelected = get(foodItemDataWithSelectedState)

    return calculateNutritionalFactTable(foodItemDataWithSelected)
  }
})