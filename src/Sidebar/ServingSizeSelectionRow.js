import React from "react";
import { useRecoilState } from "recoil";

import { InputNumber, Row, Col, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import {
  selectedQuantityState,
  selectedWeightState,
} from "../recoil/foodItemDataState";

import _ from "lodash";

import "./ServingSizeSelectionRow.scss";

const { Option } = Select;

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 10000;

function ServingSizeSelectionRow({ foodItemData }) {
  const [selectedQuantity, setSelectedQuantity] = useRecoilState(
    selectedQuantityState
  );
  const [selectedWeight, setSelectedWeight] = useRecoilState(
    selectedWeightState
  );

  const servings = _.entries(foodItemData.servings);

  const renderServing = ([servingKey, { description }]) => (
    <Option value={servingKey} key={servingKey}>
      {description}
    </Option>
  );

  const updateSelectedQuantity = (selectedQuantity) => {
    if (MIN_QUANTITY <= selectedQuantity && selectedQuantity < MAX_QUANTITY) {
      setSelectedQuantity(selectedQuantity);
    }
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
          onChange={setSelectedWeight}
        >
          {servings.map(renderServing)}
        </Select>
      </Col>
    </Row>
  );
}

export default ServingSizeSelectionRow;
