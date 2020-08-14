import React from "react";
import { useRecoilValue } from "recoil"

import { List } from "antd";
import SidebarFoodCard from "./SidebarFoodCard";

import { foodItemDataState } from "../recoil/foodItemDataState";

function SideBarFoodList() {
  const foodItemData = useRecoilValue(foodItemDataState);

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
