import { atom, selector, DefaultValue } from "recoil";
import {
  calculateNutritionalFactTable,
  validQuantityWeightFromQueryParams,
} from "../util/format_food_item_data";

export const foodItemDataNameState = selector({
  key: "foodItemDataNameState",
  get: ({ get }) => {
    const foodItemData = get(foodItemDataState);
    return foodItemData && foodItemData.name;
  },
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

export const selectedWeightState = atom({
  key: "selectedWeightState",
  default: "wt1",
});

export const quantityWeightState = selector({
  key: "quantityWeightState",
  get: ({ get }) => {
    const foodItemData = get(foodItemDataState);
    const selectedQuantity = get(selectedQuantityState);
    const selectedWeight = get(selectedWeightState);

    if (!foodItemData) {
      return {
        selectedQuantity: 1,
        selectedWeight: 'wt1',
      };
    }

    return validQuantityWeightFromQueryParams(
      foodItemData,
      selectedWeight,
      selectedQuantity
    );
  },
  set: ({ set }, newValue) => {
    const defaultOrKey = (key) =>
      newValue instanceof DefaultValue ? newValue : newValue[key];
    const selectedQuantity = defaultOrKey("selectedQuantity");
    const selectedWeight = defaultOrKey("selectedWeight");

    set(selectedQuantityState, defaultOrKey("selectedQuantity"));
    set(selectedWeightState, defaultOrKey("selectedWeight"));
  },
});

const foodItemDataWithSelectedState = selector({
  key: "foodItemDataWithSelectedState",
  get: ({ get }) => {
    const foodItemData = get(foodItemDataState);
    const quantityWeight = get(quantityWeightState);

    if (!foodItemData) return null;

    return {
      ...foodItemData,
      ...quantityWeight,
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
    const quantityWeight = get(quantityWeightState);

    if (!foodItemData) return "";

    const { selectedQuantity, selectedWeight } = quantityWeight;

    let queryString = `/nutrition-facts/${foodItemData.name}`;

    if (selectedQuantity && selectedWeight) {
      queryString += `/${selectedWeight}/${selectedQuantity}`;
    }

    return queryString;
  },
});
