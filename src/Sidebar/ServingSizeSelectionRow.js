import React from "react";
import { useRecoilState } from "recoil";

import { InputNumber, Row, Col, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import {
  selectedQuantityState,
  selectedWeightIndexState,
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
  const [selectedWeightIndex, setSelectedWeightIndex] = useRecoilState(
    selectedWeightIndexState
  );

  const servings = _.values(JSON.parse(foodItemData.servingsizes)).map(
    ([weight, description]) => `${description} (${weight}g)`
  );

  const selectedWeight = servings[selectedWeightIndex];

  const renderServing = (serving, index) => (
    <Option value={index} key={serving}>
      {serving}
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
          onChange={setSelectedWeightIndex}
        >
          {servings.map(renderServing)}
        </Select>
      </Col>
    </Row>
  );
}

export default ServingSizeSelectionRow;
