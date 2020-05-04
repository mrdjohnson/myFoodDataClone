import { useLocation } from "react-router-dom";

// https://reacttraining.com/react-router/web/example/query-parameters

export default function useQueryParams() {
  const query = new URLSearchParams(useLocation().search);

  return {
      foodId: query.get('food'),
      servingWeight: query.get('serv'),
      quantity: Number(query.get('qty'))
  };
}
