import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { observer } from "mobx-react";

import NutritionFactsTable from "./NutritionFactsTable";
import { Row, Drawer, Button } from "antd";
import NutritionFactsHistogram from "./NutritionFactsHistogram";

import useIsMobile from "../hooks/useIsMobile";

import { useFoodItemDataStore } from "../hooks/useStore";

import "./NutritionFactsPanel.scss";
import Sidebar from "../Sidebar/Sidebar";
import ServingSizeSelectionRow from "../Sidebar/ServingSizeSelectionRow";

function NutritionFactsPanel({ className }) {
  const {
    params: { foodName, weight, quantity },
  } = useRouteMatch();

  const foodItemDataStore = useFoodItemDataStore();

  const { foodItemData } = foodItemDataStore;

  const [displayDrawer, setDisplayDrawer] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    foodItemDataStore.setFoodItemDataFromName(foodName, quantity, weight);

    setDisplayDrawer(false);
  }, [foodName]);

  if (!foodItemData) return null;

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
          style={{ borderBottom: "1px solid #ddd" }}
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
      <div className="facts-panel-subheader">
        {foodItemData.food_description}
      </div>

      <div>
        <strong>Database: </strong>
        {foodItemData.data_db_name}
      </div>

      <div>
        <MobileServingSizeSelector />
        <Row align="middle" className="facts-panel-body">
          <NutritionFactsTable foodItemData={foodItemData} />
          <NutritionFactsHistogram foodItemData={foodItemData} />
        </Row>
      </div>
    </div>
  );
}

export default observer(NutritionFactsPanel);
