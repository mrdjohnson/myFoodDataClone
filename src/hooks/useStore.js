import { useContext } from "react";
import { MobXProviderContext } from "mobx-react";

export function useStore() {
  return useContext(MobXProviderContext).store;
}

export function useFoodItemDataStore() {
  return useStore().foodItemDataStore;
}
