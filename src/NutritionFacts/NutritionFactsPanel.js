import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";

import NutritionFactsTable from "./NutritionFactsTable";
import { Row, Drawer, Button } from "antd";
import NutritionFactsHistogram from "./NutritionFactsHistogram";

import { isMobileState } from "../hooks/useIsMobile";
import { displayDrawerState } from "../recoil/displayDrawerState";
import { foodItemDataState } from "../recoil/foodItemDataState";

import useAsyncRecoilValue from "../hooks/useAsyncRecoilValue"

import "./NutritionFactsPanel.scss";
import Sidebar from "../Sidebar/Sidebar";
import ServingSizeSelectionRow from "../Sidebar/ServingSizeSelectionRow";

export default function NutritionFactsPanel({ className }) {
  const foodItemData = useAsyncRecoilValue(foodItemDataState);
  const [displayDrawer, setDisplayDrawer] = useRecoilState(displayDrawerState);
  const isMobile = useRecoilValue(isMobileState);

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
