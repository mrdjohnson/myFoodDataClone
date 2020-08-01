import React from "react";

import { List } from "antd";
import SidebarFoodCard from "./SidebarFoodCard";

import { foodItemDataState } from "../recoil/foodItemDataState";
import useAsyncRecoilValue from "../hooks/useAsyncRecoilValue"

function SideBarFoodList() {
  const foodItemData = useAsyncRecoilValue(foodItemDataState);

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
