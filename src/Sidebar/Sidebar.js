import React from "react";

import { Layout } from "antd";

import SidebarFoodList from "./SidebarFoodList";
import Searchbar from "../Searchbar/Searchbar";

import "./Sidebar.scss";

function Sidebar() {
  return (
    <Layout className="sidebar">
      <Searchbar />

      <SidebarFoodList />
    </Layout>
  );
}

export default Sidebar;
