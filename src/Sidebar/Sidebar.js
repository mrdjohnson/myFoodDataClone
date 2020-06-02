import React from "react";

import { Layout } from "antd";

import SidebarFoodList from "./SidebarFoodList";
import Searchbar from "../Searchbar/Searchbar";

import "./Sidebar.scss";

function Sidebar({ className }) {
  return (
    <div className={className}>
      <Layout className="sidebar">
        <div className="sidebar__container">
          <Searchbar />

          <SidebarFoodList />
        </div>
      </Layout>
    </div>
  );
}

export default Sidebar;
