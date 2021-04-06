import { useContext } from "react";
import { MobXProviderContext } from "mobx-react";

export function useStore() {
  return useContext(MobXProviderContext);
}

export function useFoodItemDataStore() {
  return useStore().foodItemDataStore;
}
