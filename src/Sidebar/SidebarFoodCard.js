import React, { useContext } from "react";
import AppContext from "../AppContext";

import { Card, Tooltip, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import ServingSizeSelectionRow from "./ServingSizeSelectionRow";

import _ from "lodash";

import "./SidebarFoodCard.scss";

function SidebarFoodCard({ foodItemData }) {
  const { clearFoodItemData } = useContext(AppContext);

  const closeButton = (
    <Tooltip title="close">
      <Button
        type="link"
        icon={<CloseOutlined />}
        onClick={clearFoodItemData}
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
