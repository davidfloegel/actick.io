import React, { useState } from "react";
import styled, { css } from "styled-components";

import Button from "./button";
import Textarea from "./textarea";

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
  ${({ type }) => css`
    font-size: 18px;
    color: ${type === "success" ? "#2ecc71" : "#e74c3c"};
  `};
`;

const Footer = styled(Header)``;

const Item = ({ id, openItem, isOpen, onClick }) => (
  <React.Fragment>
    <ItemRow
      onClick={onClick}
      isOpen={isOpen}
      fade={openItem && openItem !== id}
    >
      <Col width="10">S{id}</Col>
      <Col width="50" center>
        <StatusIcon type="success" className="far fa-check-circle" />
      </Col>
      <Col width="auto">
        User can create an account and receives confirmation email
      </Col>
      <Col width="200">Just Now</Col>
    </ItemRow>
    {isOpen && (
      <Details>
        <DetailsTable>
          <tbody>
            <tr>
              <th>Steps</th>
              <td>
                <Textarea placeholder="Enter replication steps..." />
              </td>
            </tr>
            <tr>
              <th>Test Data</th>
              <td>
                <Textarea placeholder="Enter any test data info required for this test" />
              </td>
            </tr>
            <tr>
              <th>Expected Outcome</th>
              <td>
                <Textarea placeholder="What is the expected outcome?" />
              </td>
            </tr>
            <tr>
              <th>Actual Outcome</th>
              <td>
                <Textarea placeholder="What was the actual outcome?" />
              </td>
            </tr>
          </tbody>
        </DetailsTable>

        <Button type="dangerLink">Delete Scenario</Button>
      </Details>
    )}
  </React.Fragment>
);

export default () => {
  const [openItem, setOpenItem] = useState(null);

  const items = [...Array(20).keys()].map(i => i + 1);

  return (
    <Section>
      <Header>
        <Title>AuColentication</Title>
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

      {items.map(i => (
        <Item
          key={i}
          id={i}
          openItem={openItem}
          isOpen={openItem === i}
          onClick={() => (openItem === i ? setOpenItem(null) : setOpenItem(i))}
        />
      ))}
      <Footer>Add a new Item</Footer>
    </Section>
  );
};
