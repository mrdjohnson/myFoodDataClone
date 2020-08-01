// https://reacttraining.com/react-router/web/example/query-parameters

export default async function getQueryParamsFromHistory(history) {
  const location = history.location;

  const query = new URLSearchParams(location.search);
  const foodId = query.get("food");
  const servingWeight = query.get("serv");
  const quantity = Number(query.get("qty"));

  const idToNameMap = await import("../fixtures/id_to_name_map.json");
  const foodName = idToNameMap[foodId];

  console.log("got food nameL" , foodName, foodId)

  return {
    foodName,
    servingWeight,
    quantity,
  };
}
