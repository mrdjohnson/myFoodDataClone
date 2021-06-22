import { types } from "mobx-state-tree";

import { FoodItemDataStoreModel } from "@models/FoodItemDataStoreModel";

export const RootStoreModel = types
  .model("RootStore", {
    foodItemDataStore: types.optional(FoodItemDataStoreModel, {}),
    pathname: types.maybeNull(types.string),
  })
  .volatile((_self) => ({
    router: null,
  }))
  .actions((self) => ({
    setRouter(router) {
      self.router = router;
    },

    updatePathname() {
      const oldPathname = self.pathname;
      let newPathname = self.foodItemDataStore.queryString;

      newPathname = newPathname || "/";

      if (oldPathname === "/" || newPathname === "/") {
        self.router.push({ pathname: newPathname });
      } else {
        self.router.replace({ pathname: newPathname });
      }

      self.pathname = newPathname;
    },
  }));
