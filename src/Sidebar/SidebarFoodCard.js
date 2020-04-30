import React, { useState, useEffect, useContext } from "react";
import AppContext from "../AppContext";

import { Card, Tooltip, Button, InputNumber, Row, Col, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import _ from "lodash";

import "./SidebarFoodCard.scss";

const { Option } = Select;

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 10000;

function SidebarFoodCard({ foodItemData }) {
  const {
    clearFoodItemData,
    updateFoodWithSelectedQuantity,
    updateFoodWithSelectedWeight,
  } = useContext(AppContext);

  const { selectedQuantity, selectedWeightIndex } = foodItemData;
  const servingDescriptions = foodItemData["desc_arr"];
  const servingWeights = foodItemData["wt_arr"].map(_.toInteger);
  const servings = _.zip(servingDescriptions, servingWeights).map(
    ([description, weight]) => `${description} (${weight}g)`
  );

  const selectedWeight = servings[selectedWeightIndex];

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

  const renderServing = (serving, index) => (
    <Option value={index} key={serving}>
      {serving}
    </Option>
  );

  const updateSelectedQuantity = (selectedQuantity) => {
    if (MIN_QUANTITY <= selectedQuantity && selectedQuantity < MAX_QUANTITY) {
      updateFoodWithSelectedQuantity(foodItemData, selectedQuantity);
    }
  };

  const updateSelectedWeightIndex = (selectedWeightIndex) => {
    updateFoodWithSelectedWeight(foodItemData, selectedWeightIndex);
  };

  return (
    <Card
      title={foodItemData.name}
      size="small"
      extra={closeButton}
      className="sidebar-food-card"
    >
      <Row className="sidebar-food-card__body" align="middle">
        <Col span={4}>
          <InputNumber
            min={MIN_QUANTITY}
            max={MAX_QUANTITY}
            value={selectedQuantity}
            placeholder={1}
            onChange={updateSelectedQuantity}
            className="sidebar-food-card__serving-input"
          />
        </Col>

        <Col span={2}>
          <CloseOutlined />
        </Col>

        <Col span={18}>
          <Select
            value={selectedWeight}
            className="sidebar-food-card__select"
            style={{ width: "100%" }}
            dropdownMatchSelectWidth={false}
            onChange={updateSelectedWeightIndex}
          >
            {servings.map(renderServing)}
          </Select>
        </Col>
      </Row>
    </Card>
  );
}

export default SidebarFoodCard;
