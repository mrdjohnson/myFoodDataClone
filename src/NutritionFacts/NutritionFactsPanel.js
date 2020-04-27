import React from "react";

import NutritionFactsTable from "./NutritionFactsTable";
import { Row } from "antd";
import NutritionFactsHistogram from "./NutritionFactsHistogram";

export default function NutritionFactsPanel() {
  return (
    <Row>
      <NutritionFactsTable />
      <NutritionFactsHistogram />
    </Row>
  );
}
