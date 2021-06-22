import { types, getRoot } from "mobx-state-tree";
import _ from "lodash";

import {
  calculateNutritionalFactTable,
  validServingWeight,
  validQuantity,
} from "@util/format_food_item_data";

const NumberOrNullType = types.maybeNull(types.number);

export const FoodItemDataModel = types
  .model("FoodItemData", {
    NDB_No: types.identifier,
    name3: types.string,
    servingsizes: types.string,
    food_description: types.maybeNull(types.string),
    data_db_name: types.maybeNull(types.string),

    WATER: NumberOrNullType,
    ALC: NumberOrNullType,
    ENERC_KCAL: NumberOrNullType,
    FAT: NumberOrNullType,
    FASAT: NumberOrNullType,
    FATRN: NumberOrNullType,
    CHOLE: NumberOrNullType,
    NA: NumberOrNullType,
    CHOCDF: NumberOrNullType,
    FIBTG: NumberOrNullType,
    SUGAR: NumberOrNullType,
    ADD_SG: NumberOrNullType,
    PROCNT: NumberOrNullType,
    VITC: NumberOrNullType,
    VITD: NumberOrNullType,
    FE: NumberOrNullType,
    CA: NumberOrNullType,
    K: NumberOrNullType,
    P: NumberOrNullType,

    selectedQuantity: types.optional(types.number, 1),
    _selectedWeight: types.optional(types.string, "wt1"),
  })

  .actions((self) => ({
    setSelectedQuantity(selectedQuantity) {
      self.selectedQuantity = validQuantity(Number(selectedQuantity));
      self.updateStore();
    },

    setSelectedWeight(selectedWeight) {
      self._selectedWeight = validServingWeight(self, selectedWeight);
      self.updateStore();
    },

    updateStore() {
      const { updatePathname } = getRoot(self);

      if (updatePathname) {
        updatePathname();
      }
    },
  }))

  .views((self) => ({
    get nutritionFacts() {
      return calculateNutritionalFactTable(self);
    },

    get servings() {
      const servingSizes = JSON.parse(self.servingsizes);

      return _.mapValues(servingSizes, ([weight, description]) => ({
        weight,
        description: `${description} (${weight}g)`,
      }));
    },

    get name() {
      return self.name3;
    },

    get id() {
      return self.NDB_No;
    },

    get selectedWeight() {
      return validServingWeight(self, self._selectedWeight);
    },

    get queryString() {
      const { selectedQuantity, selectedWeight } = self;

      let queryString = `/nutrition-facts/${self.name}`;

      if (selectedQuantity && selectedWeight) {
        queryString += `/${selectedWeight}/${selectedQuantity}`;
      }

      console.log("new query string: ", queryString);

      return queryString;
    },
  }));
