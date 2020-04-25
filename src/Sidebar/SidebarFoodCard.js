import React, { useState, useEffect, useContext } from "react";
import AppContext from "../AppContext";

import { Card, Tooltip, Button, InputNumber, Row, Col, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import _ from "lodash";

import "./SidebarFoodCard.scss";

const { Option } = Select;

function SidebarFoodCard({ foodItemData }) {
  const { clearFoodItemData } = useContext(AppContext);

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

  const renderServing = (serving) => {
    const [description, weight] = serving;

    return (
      <Option value={weight} key={description}>
        {description} {`(${weight}g)`}
      </Option>
    );
  };

  const handleChange = () => {};

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
            min={1}
            defaultValue={3}
            onChange={handleChange}
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
            onChange={setSelectedServing}
          >
            {servings.map(renderServing)}
          </Select>
        </Col>
      </Row>
    </Card>
  );
}

export default SidebarFoodCard;
