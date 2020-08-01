import React from "react";
import { useRecoilValue } from "recoil";

import { foodItemDataState } from "../recoil/foodItemDataState";
import { Row, Col } from "antd";

import _ from "lodash";

import "./NutritionFactsHistogram.scss";

export default function NutritionFactsHistogram() {
  const foodItemData = useRecoilValue(foodItemDataState);

  if (!foodItemData) return null;

  const { WATER, FAT, CHOCDF, PROCNT, ALC } = foodItemData;

  const informationPresent =
    WATER !== "~" && FAT !== "~" && CHOCDF !== "~" && PROCNT !== "~";

  const water = Number(WATER);
  const fat = Number(FAT);
  const carbs = Number(CHOCDF);
  const protein = Number(PROCNT);
  const alcohol = Number(ALC);

  const containsAlcohol = alcohol > 0;

  const componentTotal = water + fat + carbs + protein + alcohol;

  const waterPercentage = _.toInteger((water / componentTotal) * 100);
  const fatPercentage = _.toInteger((fat / componentTotal) * 100);
  const carbsPercentage = _.toInteger((carbs / componentTotal) * 100);
  const proteinPercentage = _.toInteger((protein / componentTotal) * 100);
  const alcoholPercentage = _.toInteger((alcohol / componentTotal) * 100);

  return (
    informationPresent && (
      <div className="histograms">
        <div className="data-title">What is this food made of?</div>
        <div className="data-tile">
          <Row className="square" align="bottom">
            <Col className="water" style={{ height: `${waterPercentage}%` }} />

            <Col className="fat" style={{ height: `${fatPercentage}%` }} />

            <Col className="carbs" style={{ height: `${carbsPercentage}%` }} />

            <Col
              className="protein"
              style={{ height: `${proteinPercentage}%` }}
            />

            {containsAlcohol && (
              <Col
                className="alcohol"
                style={{ height: `${alcoholPercentage}%` }}
              />
            )}
          </Row>

          <Row className="legend">
            <Col>
              <div>{waterPercentage}%</div>
              <div>Water</div>
            </Col>

            <Col>
              <div>{fatPercentage}%</div>
              <div>Fat</div>
            </Col>

            <Col>
              <div>{carbsPercentage}%</div>
              <div>Carbs</div>
            </Col>

            <Col>
              <div>{proteinPercentage}%</div>
              <div>Protein</div>
            </Col>

            {containsAlcohol && (
              <Col>
                <div>{alcoholPercentage}%</div>
                <div>Alcohol</div>
              </Col>
            )}
          </Row>
        </div>
      </div>
    )
  );
}
