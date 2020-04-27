import React, { useContext } from "react";

import NutritionFactsTable from "./NutritionFactsTable";
import { Row } from "antd";
import NutritionFactsHistogram from "./NutritionFactsHistogram";
import AppContext from "../AppContext";

import "./NutritionFactsPanel.scss";

export default function NutritionFactsPanel() {
  const { foodItemData } = useContext(AppContext);

  if (!foodItemData) return null;
  return (
    <div className="facts-panel">
      <h1 className="facts-panel-header">{foodItemData.name}</h1>
      <div className="facts-panel-subheader">{foodItemData.longname}</div>
      <div>
        <strong>Database:</strong>
        {foodItemData.datatype}
      </div>
      <Row align="middle" className="facts-panel-body">
        <NutritionFactsTable />
        <NutritionFactsHistogram />
      </Row>
    </div>
  );
}
