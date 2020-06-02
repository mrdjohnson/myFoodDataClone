import React, { useContext } from "react";

import NutritionFactsTable from "./NutritionFactsTable";
import { Row, Drawer, Button } from "antd";
import NutritionFactsHistogram from "./NutritionFactsHistogram";
import AppContext from "../AppContext";

import "./NutritionFactsPanel.scss";
import Sidebar from "../Sidebar/Sidebar";
import ServingSizeSelectionRow from "../Sidebar/ServingSizeSelectionRow";

export default function NutritionFactsPanel({ className }) {
  const {
    foodItemData,
    isMobile,
    displayDrawer,
    setDisplayDrawer,
  } = useContext(AppContext);

  const MobileHeader = () =>
    isMobile && (
      <>
        <Button
          className="facts-panel__button"
          size="large"
          onClick={() => setDisplayDrawer(true)}
        >
          🔍 Find Another Food
        </Button>
        <Drawer
          title="Find Food!"
          placement="left"
          closable={true}
          onClose={() => setDisplayDrawer(false)}
          visible={displayDrawer}
          style={{ width: "100%" }}
        >
          <Sidebar />
        </Drawer>
      </>
    );

  const MobileServingSizeSelector = () =>
    isMobile && (
      <div className="facts-panel-body">
        <Row
          className="serving-selector"
          style={{ "border-bottom": "1px solid #ddd" }}
        >
          Serving Size:
        </Row>

        <ServingSizeSelectionRow foodItemData={foodItemData} />
      </div>
    );

  return (
    <div className={`${className} facts-panel`}>
      <MobileHeader />

      <h1 className="facts-panel-header">{foodItemData.name}</h1>
      <div className="facts-panel-subheader">{foodItemData.longname}</div>

      <div>
        <strong>Database: </strong>
        {foodItemData.datatype}
      </div>

      <div>
        <MobileServingSizeSelector />
        <Row align="middle" className="facts-panel-body">
          <NutritionFactsTable />
          <NutritionFactsHistogram />
        </Row>
      </div>
    </div>
  );
}
