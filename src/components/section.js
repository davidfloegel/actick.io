import React, { useState } from "react";
import styled, { css } from "styled-components";
import * as dateFns from "date-fns";

import { useStateValue } from "../state";
import Button from "./button";
import Textarea from "./textarea";
import InlineEditInput from "./inlineEditInput";
import AddNewItem from "./addNewItem";

const Section = styled.div`
  border: 1px solid #eee;
  border-radius: 2px;
  box-shadow: 0px 7px 17px -10px rgba(0, 0, 0, 0.18);
  margin-bottom: 50px;
`;

const Header = styled.div`
  background: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 0 20px;
`;

const Title = styled.div`
  font-size: 20px;
`;

const Count = styled.div``;

const Col = styled.div`
  ${({ width, center }) => css`
    width: ${width}px;

    ${width === "auto" &&
      css`
        flex: 1;
      `};

    ${center &&
      css`
        text-align: center;
      `};
  `};

  padding: 10px 20px;
`;
const ItemsHeader = styled.div`
  height: 35px;
  display: flex;
  align-items: center;
  width: 100%;

  ${Col} {
    font-weight: bold;
  }
`;

const ItemItem = styled.div`
  ${({ isOpen }) =>
    isOpen &&
    css`
      box-shadow: 0px 0px 17px -10px rgba(0, 0, 0, 0.63);
      border-radius: 2px;
    `};
`;

const ItemRow = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;

  ${({ fade }) =>
    fade &&
    css`
      opacity: 0.5;
    `};
`;

const Details = styled.div`
  padding: 20px;
`;

const DetailsTable = styled.table`
  width: 100%;
  th {
    width: 150px;
    text-align: left;
    padding: 10px 20px 10px 0;
    vertical-align: top;
  }
`;

const StatusIcon = styled.i`
  ${({ type, color }) => css`
    font-size: 18px;
    color: ${color};
  `};
`;

const Footer = styled(Header)``;

const ICON_FOR_STATUS = {
  1: { icon: "fa fa-hourglass-half", color: "#f1c40f" },
  2: { icon: "far fa-stopwatch", color: "#3498db" },
  3: { icon: "far fa-check-circle", color: "#2ecc71" },
  4: { icon: "far fa-times-circle", color: "#e74c3c" },
  5: { icon: "far fa-redo", color: "#9b59b6" }
};

const Textfield = ({ initialValue, onSave, ...rest }) => {
  const [value, setValue] = useState(initialValue);

  return (
    <Textarea
      placeholder={rest.placeholder}
      value={value}
      onChange={e => setValue(e.target.value)}
      onBlur={() => {
        onSave(value);
      }}
    />
  );
};

const Item = ({
  id,
  openItem,
  isOpen,
  onClick,
  scenario,
  onUpdateItem,
  onDelete
}) => (
  <ItemItem isOpen={isOpen}>
    <ItemRow
      onClick={onClick}
      isOpen={isOpen}
      fade={openItem && openItem !== id}
    >
      <Col width="10">{id}</Col>
      <Col width="50" style={{ textAlign: "center" }}>
        <StatusIcon
          color={ICON_FOR_STATUS[scenario.status].color}
          className={ICON_FOR_STATUS[scenario.status].icon}
        />
      </Col>
      <Col width="auto">{scenario.description}</Col>
      <Col width="200">
        {dateFns.format(new Date(scenario.lastUpdated), "dd.MM.yyyy HH:mm")}
      </Col>
    </ItemRow>
    {isOpen && (
      <Details>
        <DetailsTable>
          <tbody>
            <tr>
              <th>Steps</th>
              <td>
                <Textfield
                  initialValue={scenario.steps}
                  onSave={v => onUpdateItem({ steps: v })}
                  placeholder="Enter replication steps..."
                />
              </td>
            </tr>
            <tr>
              <th>Test Data</th>
              <td>
                <Textfield
                  initialValue={scenario.testData}
                  onSave={v => onUpdateItem({ testData: v })}
                  placeholder="Is any test data (i.e. accounts) needed to replicate?"
                />
              </td>
            </tr>
            <tr>
              <th>Expected Outcome</th>
              <td>
                <Textfield
                  initialValue={scenario.expectedOutcome}
                  onSave={v => onUpdateItem({ expectedOutcome: v })}
                  placeholder="What is the expected outcome?"
                />
              </td>
            </tr>
            <tr>
              <th>Actual Outcome</th>
              <td>
                <Textfield
                  initialValue={scenario.actualOutcome}
                  onSave={v => onUpdateItem({ actualOutcome: v })}
                  placeholder="What was the actual outcome?"
                />
              </td>
            </tr>
          </tbody>
        </DetailsTable>

        <Button type="dangerLink" onClick={onDelete}>
          Delete Scenario
        </Button>
      </Details>
    )}
  </ItemItem>
);

export default ({
  scenarios,
  sectionName,
  onUpdateSectionName,
  onUpdateItem,
  onDeleteItem
}) => {
  const [openItem, setOpenItem] = useState(null);

  return (
    <Section>
      <Header>
        <InlineEditInput
          value={sectionName}
          onSave={v => onUpdateSectionName(sectionName, v)}
        >
          <Title>{sectionName}</Title>
        </InlineEditInput>
        <Count>4 / 10</Count>
      </Header>
      <ItemsHeader>
        <Col width="10">#</Col>
        <Col width="50" center>
          Status
        </Col>
        <Col width="auto">Description</Col>
        <Col width="200">Last Updated</Col>
      </ItemsHeader>

      {scenarios.map(scenario => (
        <Item
          key={scenario.id}
          id={scenario.id}
          openItem={openItem}
          isOpen={openItem === scenario.id}
          onClick={() =>
            openItem === scenario.id
              ? setOpenItem(null)
              : setOpenItem(scenario.id)
          }
          scenario={scenario}
          onUpdateItem={d => onUpdateItem(scenario.id, d)}
          onDelete={() => {
            onDeleteItem(scenario.id);
            setOpenItem(null);
          }}
        />
      ))}
      <Footer>
        <AddNewItem sectionName={sectionName} />
      </Footer>
    </Section>
  );
};
