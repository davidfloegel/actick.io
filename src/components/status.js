import _ from "lodash";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu
} from "styled-dropdown-component";

const ICON_FOR_STATUS = {
  1: { icon: "fa fa-hourglass-half", color: "#f1c40f" },
  2: { icon: "fa fa-stopwatch", color: "#3498db" },
  3: { icon: "far fa-check-circle", color: "#2ecc71" },
  4: { icon: "far fa-times-circle", color: "#e74c3c" },
  5: { icon: "fa fa-redo", color: "#9b59b6" }
};

const STATUS = {
  1: "To do",
  2: "In Test",
  3: "Passed",
  4: "Failed",
  5: "Retest"
};

const Trigger = styled(DropdownItem)`
  border: 1px solid red;
`;

const Container = styled.div`
  display: flex;
`;

const StatusIcon = styled.i`
  ${({ type, color }) => css`
    font-size: 18px;
    color: ${color};
  `};
`;

const Text = styled.span`
  margin-left: 10px;
`;

const Status = ({ onChange, status }) => {
  const [hidden, setHidden] = useState(true);

  const onToggle = e => setHidden(!hidden);

  return (
    <Dropdown>
      <StatusIcon
        onClick={onToggle}
        color={ICON_FOR_STATUS[status].color}
        className={ICON_FOR_STATUS[status].icon}
      />
      <DropdownMenu hidden={hidden} toggle={onToggle}>
        {_.map(STATUS, (item, i) => (
          <DropdownItem
            key={i}
            onClick={() => {
              onChange(i);
              onToggle();
            }}
          >
            <Container>
              <StatusIcon
                color={ICON_FOR_STATUS[i].color}
                className={ICON_FOR_STATUS[i].icon}
              />
              <Text>{STATUS[i]}</Text>
            </Container>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default Status;
