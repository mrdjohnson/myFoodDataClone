import { useState, useEffect } from "react";

import useQueryParams from "./useQueryParams";

export default function useInitialFoodName() {
  const { foodId } = useQueryParams();
  const [initialFoodName, setInitialFoodName] = useState();

  useEffect(() => {
    if (!foodId) return;

    function setInitialFoodData(idToNameMap) {
      const foodName = idToNameMap[foodId];

      if (foodName) {
        setInitialFoodName(foodName);
      }
    }

    import("../fixtures/id_to_name_map.json").then(setInitialFoodData);
  }, [foodId]);

  return initialFoodName;
}
