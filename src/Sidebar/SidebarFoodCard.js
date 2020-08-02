import React from "react";
import { useResetRecoilState } from "recoil";

import { Card, Tooltip, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import ServingSizeSelectionRow from "./ServingSizeSelectionRow";

import { foodItemDataState } from "../recoil/foodItemDataState";

import "./SidebarFoodCard.scss";

function SidebarFoodCard({ foodItemData }) {
  const resetFoodItemData = useResetRecoilState(foodItemDataState);
  // const resetFoodItemData = () => null;


  const closeButton = (
    <Tooltip title="close">
      <Button
        type="link"
        icon={<CloseOutlined />}
        onClick={resetFoodItemData}
        className="sidebar-food-card__close-button"
      />
    </Tooltip>
  );

  return (
    <Card
      title={foodItemData.name}
      size="small"
      extra={closeButton}
      className="sidebar-food-card"
    >
      <ServingSizeSelectionRow foodItemData={foodItemData} />
    </Card>
  );
}

export default SidebarFoodCard;
