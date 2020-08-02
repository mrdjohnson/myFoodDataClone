import { atom, selector, DefaultValue } from "recoil";
import { calculateNutritionalFactTable } from "../util/format_food_item_data";

export const foodItemDataNameState = selector({
  key: "foodItemDataNameState",
  get: ({ get }) => {
    const foodItemData = get(foodItemDataState);
    return foodItemData && foodItemData.name;
  }
});

export const foodItemQueryParamsState = atom({
  key: "foodItemQueryParamsState",
  default: {},
});

export const foodItemDataState = atom({
  key: "foodItemDataState",
  default: null,
});

export const selectedQuantityState = atom({
  key: "selectedQuantityState",
  default: 1,
});

export const selectedWeightIndexState = atom({
  key: "selectedWeightIndexState",
  default: 0,
});

export const quantityWeightIndexState = selector({
  key: "quantityWeightIndexState",
  get: ({ get }) => {
    const selectedQuantity = get(selectedQuantityState);
    const selectedWeightIndex = get(selectedWeightIndexState);

    return {
      selectedQuantity,
      selectedWeightIndex,
    };
  },
  set: ({ set }, newValue) => {
    console.log("set->quantityWeightIndexState");
    const defaultOrKey = (key) =>
      newValue instanceof DefaultValue ? newValue : newValue[key];

    set(selectedQuantityState, defaultOrKey("selectedQuantity"));
    set(selectedWeightIndexState, defaultOrKey("selectedWeightIndex"));
  },
});

const foodItemDataWithSelectedState = selector({
  key: "foodItemDataWithSelectedState",
  get: ({ get }) => {
    const foodItemData = get(foodItemDataState);
    const quantityWeightIndex = get(quantityWeightIndexState);

    if (!foodItemData) return null;

    console.log(":quantityWeightIndex", quantityWeightIndex);

    return {
      ...foodItemData,
      ...quantityWeightIndex,
    };
  },
});

export const foodItemDataNutritionFactsState = selector({
  key: "foodItemDataNutritionFactsState",
  get: ({ get }) => {
    const foodItemDataWithSelected = get(foodItemDataWithSelectedState);

    if (!foodItemDataWithSelected) return null;

    return calculateNutritionalFactTable(foodItemDataWithSelected);
  },
});

export const foodItemDataQueryStringState = selector({
  key: "foodItemDataURLState",
  get: ({ get }) => {
    const foodItemData = get(foodItemDataState);
    const quantityWeightIndex = get(quantityWeightIndexState);

    if (!foodItemData) return "";

    const { id } = foodItemData;
    const { selectedQuantity, selectedWeightIndex } = quantityWeightIndex;
    const servingCode = foodItemData.code_arr[selectedWeightIndex];

    const queryString = `?food=${id}&serv=${servingCode}&qty=${selectedQuantity}`;

    return queryString;
  },
});
