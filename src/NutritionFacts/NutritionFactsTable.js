import React from "react";
import { observer } from "mobx-react";

import { Row } from "antd";

import "./NutritionFactsTable.scss";

function NutritionFactsTable({ foodItemData }) {
  const foodItemDataNutritionFacts = foodItemData.nutritionFacts;

  if (!foodItemDataNutritionFacts) return null;

  const {
    calories,
    totalFat,
    saturatedFat,
    transFat,
    cholesterol,
    sodium,
    totalCarbohydrates,
    fiber,
    sugar,
    addedSugar,
    protein,
    vitaminC,
    vitaminD,
    iron,
    calcium,
    potassium,
    phosphorus,
    servingDescription,
  } = foodItemDataNutritionFacts;

  const AddedSugar = () => {
    if (addedSugar.value === "~") {
      return (
        <Row className="no-sugar-added">
          <span>~ No added sugar data collected</span>
          <b>~</b>
        </Row>
      );
    }

    return (
      <Row className="no-sugar-added">
        <span>Includes {addedSugar.value}g Added Sugars</span>
        <b>{addedSugar.percentage}</b>
      </Row>
    );
  };

  return (
    <div className="nutrition-facts-table">
      <div className="facts-table-header">
        <b>Nutrition Facts</b>
      </div>
      <div className="facts-table-serving large-border-bottom">
        <div>
          <b>Serving Size</b>
        </div>
        <div>{servingDescription}</div>
      </div>

      <Row justify="space-between" className="calories medium-border-bottom">
        <span className="label">Calories</span>
        <span className="value">{calories.value}</span>
      </Row>

      <Row justify="end">
        <b>% Daily Value *</b>
      </Row>

      <div className="chart">
        <Row>
          <span>
            <b>Total Fat</b> {totalFat.value}g
          </span>
          <b>{totalFat.percentage}%</b>
        </Row>

        <Row className="left-padding-1">
          <span>Saturated Fat {saturatedFat.value}g</span>
          <b>{saturatedFat.percentage}%</b>
        </Row>

        <Row className="left-padding-1 thick-border-bottom">
          <span>
            <em>Trans</em> Fat {transFat.value}g
          </span>
        </Row>

        <Row className="thick-border-bottom">
          <span>
            <b>Cholesterol</b> {cholesterol.value}mg
          </span>
          <b>{cholesterol.percentage}%</b>
        </Row>

        <Row>
          <span>
            <b>Sodium</b> {sodium.value}mg
          </span>
          <b>{sodium.percentage}%</b>
        </Row>

        <Row>
          <span>
            <b>Total Carbohydrate</b> {totalCarbohydrates.value}g
          </span>
          <b>{totalCarbohydrates.percentage}%</b>
        </Row>

        <Row className="left-padding-1 thick-border-bottom">
          <span>Dietary Fiber {fiber.value}g</span>
          <b>{fiber.percentage}%</b>
        </Row>

        <Row className="left-padding-1">
          <span>Total Sugars {sugar.value}g</span>
          <b>{sugar.percentage}%</b>
        </Row>

        <AddedSugar />

        <Row className="large-border-bottom">
          <span>
            <b>Protein</b> {protein.value}g
          </span>
          <b>{protein.percentage}%</b>
        </Row>

        <Row>
          <span>Vitamin C {vitaminC.value}mg</span>
          {vitaminC.percentage}%
        </Row>

        <Row>
          <span>Vitamin D {vitaminD.value}mcg</span>
          {vitaminD.percentage}%
        </Row>

        <Row>
          <span>Iron {iron.value}mg</span>
          {iron.percentage}%
        </Row>

        <Row>
          <span>Calcium {calcium.value}mg</span>
          {calcium.percentage}%
        </Row>

        <Row>
          <span>Potassium {potassium.value}mg</span>
          {potassium.percentage}%
        </Row>

        <Row className="medium-border-bottom">
          <span>Phosphorus {phosphorus.value}mg</span>
          {phosphorus.percentage}%
        </Row>

        <Row className="facts-table-footer">
          *The % Daily Value (DV) tells you how much a nutrient in a serving of
          food contributes to a daily diet. 2,000 calories a day is used for
          general nutrition advice.
        </Row>
      </div>
    </div>
  );
}

export default observer(NutritionFactsTable);
