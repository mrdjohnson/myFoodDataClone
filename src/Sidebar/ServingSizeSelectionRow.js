import React, { useContext } from "react";
import AppContext from "../AppContext";

import { InputNumber, Row, Col, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import _ from "lodash";

import "./ServingSizeSelectionRow.scss";

const { Option } = Select;

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 10000;

function ServingSizeSelectionRow({ foodItemData }) {
  const {
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
    <Row className="serving-size-selection-row__body" align="middle">
      <Col span={4}>
        <InputNumber
          min={MIN_QUANTITY}
          max={MAX_QUANTITY}
          value={selectedQuantity}
          placeholder={1}
          onChange={updateSelectedQuantity}
          className="serving-size-selection-row__serving-input"
        />
      </Col>

      <Col span={2}>
        <CloseOutlined />
      </Col>

      <Col span={18}>
        <Select
          value={selectedWeight}
          className="serving-size-selection-row__select"
          style={{ width: "100%" }}
          dropdownMatchSelectWidth={false}
          onChange={updateSelectedWeightIndex}
        >
          {servings.map(renderServing)}
        </Select>
      </Col>
    </Row>
  );
}

export default ServingSizeSelectionRow;
