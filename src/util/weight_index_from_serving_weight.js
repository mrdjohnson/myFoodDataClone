import _ from "lodash";

function servingWeightIndexFromServingWeight(foodItemData, servingWeight) {
  const weightIndex = _.indexOf(foodItemData.code_arr, servingWeight);

  if (weightIndex < 0) {
    return 0;
  }

  return weightIndex;
}

export default servingWeightIndexFromServingWeight;
