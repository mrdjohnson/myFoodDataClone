import React, { useContext } from "react";

import { Card, Tooltip, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import "./SidebarFoodCard.scss";
import AppContext from "../AppContext";

function SidebarFoodCard({ foodItemData }) {
  console.log("foodItemData:", foodItemData);
  const { clearFoodItemData } = useContext(AppContext);

  const closeButton = (
    <Tooltip title="close">
      <Button
        type="link"
        icon={<CloseOutlined />}
        onClick={clearFoodItemData}
        className="sidebar-food-card-close-button"
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
      innards go here
    </Card>
  );
}

export default SidebarFoodCard;
