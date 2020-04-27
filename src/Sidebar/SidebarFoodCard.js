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
    updateFoodItemDataNutritionFactTable,
  } = useContext(AppContext);

  const servingDescriptions = foodItemData["desc_arr"];
  const servingWeights = foodItemData["wt_arr"].map(_.toInteger);
  const servings = _.zip(servingDescriptions, servingWeights);

  const [selectedServing, setSelectedServing] = useState(
    _.first(servingDescriptions)
  );

  useEffect(() => {
    setSelectedServing(_.first(servingDescriptions));
  }, [servingDescriptions]);

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

  const renderServing = (serving, index) => {
    const [description, weight] = serving;

    return (
      <Option value={index} key={description}>
        {description} {`(${weight}g)`}
      </Option>
    );
  };

  const updateQuantity = (selectedQuantity) => {
    if (MIN_QUANTITY < selectedQuantity && selectedQuantity < MAX_QUANTITY) {
      updateFoodItemDataNutritionFactTable({ selectedQuantity });
    }
  };

  const updateSelectedWeight = (selectedWeightIndex) => {
    updateFoodItemDataNutritionFactTable({ selectedWeightIndex });
  };

  return (
    <Card
      title={foodItemData.name}
      size="small"
      extra={closeButton}
      className="sidebar-food-card"
    >
      <Row className="sidebar-food-card__body" align="middle">
        <Col span={2}>
          <InputNumber
            min={MIN_QUANTITY}
            max={MAX_QUANTITY}
            defaultValue={1}
            onChange={updateQuantity}
            className="sidebar-food-card__serving-input"
          />
        </Col>

        <Col span={2}>
          <CloseOutlined />
        </Col>

        <Col span={20}>
          <Select
            value={selectedServing}
            style={{ width: "100%" }}
            dropdownMatchSelectWidth={false}
            onChange={updateSelectedWeight}
          >
            {servings.map(renderServing)}
          </Select>
        </Col>
      </Row>
    </Card>
  );
}

export default SidebarFoodCard;
