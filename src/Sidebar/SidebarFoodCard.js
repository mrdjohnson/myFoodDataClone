import React from "react";
import { Card, Tooltip, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import { useFoodItemDataStore } from "@hooks/useStore";

import ServingSizeSelectionRow from "./ServingSizeSelectionRow";

import "./SidebarFoodCard.scss";

function SidebarFoodCard({ foodItemData }) {
  const { removeFoodItemData } = useFoodItemDataStore();

  const remove = () => removeFoodItemData(foodItemData);

  const closeButton = (
    <Tooltip title="close">
      <Button
        type="link"
        icon={<CloseOutlined />}
        onClick={remove}
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
