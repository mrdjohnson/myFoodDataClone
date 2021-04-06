import Axios from "axios";
import { types, flow, getRoot } from "mobx-state-tree";

import { FoodItemDataModel } from "./FoodItemDataModel";

export const FoodItemDataStoreModel = types
  .model("FoodItemDataStore", {
    foodItemDatas: types.array(FoodItemDataModel),
  })

  .actions((self) => ({
    fetchFoodItemData: flow(function* (name) {
      console.log("searching name: ", name);

      if (!name) {
        return null;
      }

      const { data } = yield Axios.get(
        `https://us-central1-fasttripfinder-199123.cloudfunctions.net/my-food-data-search-proxy/?query=food/${name}`
      );

      return FoodItemDataModel.create(data[0]);
    }),

    setFoodItemDataFromName: flow(function* (name, quantity, weight) {
      const foodItemData = yield self.fetchFoodItemData(name);

      if (!foodItemData) {
        self.foodItemDatas = [];
        return;
      }

      // if we're building this foodItemData from the url
      if (!self.foodItemData) {
        foodItemData.setSelectedQuantity(quantity);
        foodItemData.setSelectedWeight(weight);
      }

      self.foodItemDatas = [foodItemData];

      getRoot(self).updatePathname();
    }),

    removeFoodItemData(item) {
      self.foodItemDatas.remove(item);

      getRoot(self).updatePathname();
    },
  }))

  .views((self) => ({
    get foodItemData() {
      if (self.foodItemDatas.length > 0) {
        return self.foodItemDatas[0];
      }

      return null;
    },

    get queryString() {
      if (self.foodItemData) {
        return self.foodItemData.queryString;
      }

      return null;
    },
  }));
