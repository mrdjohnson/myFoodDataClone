import React, { useContext } from "react";

import { List } from "antd";
import SidebarFoodCard from "./SidebarFoodCard";
import AppContext from "../AppContext";

function SideBarFoodList() {
  const { foodItemData } = useContext(AppContext);

  if (!foodItemData) return null;

  const renderListItem = (item) => (
    <List.Item key={item.name}>
      <SidebarFoodCard foodItemData={item} />
    </List.Item>
  );

  return (
    foodItemData && (
      <List dataSource={[foodItemData]} renderItem={renderListItem} />
    )
  );
}

export default SideBarFoodList;
