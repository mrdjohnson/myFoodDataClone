import React from "react";
import { observer } from "mobx-react";

import { List } from "antd";
import SidebarFoodCard from "./SidebarFoodCard";

import { useFoodItemDataStore } from "../hooks/useStore";

function SideBarFoodList() {
  const { foodItemDatas } = useFoodItemDataStore();

  if (foodItemDatas.length === 0) return null;

  const renderListItem = (item) => (
    <List.Item key={item.name}>
      <SidebarFoodCard foodItemData={item} />
    </List.Item>
  );

  return <List dataSource={foodItemDatas} renderItem={renderListItem} />;
}

export default observer(SideBarFoodList);
