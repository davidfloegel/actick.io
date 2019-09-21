import _ from 'lodash'
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
} from 'styled-dropdown-component';

const ICON_FOR_STATUS = {
  1: { icon: "fa fa-hourglass-half", color: "#f1c40f" },
  2: { icon: "far fa-stopwatch", color: "#3498db" },
  3: { icon: "far fa-check-circle", color: "#2ecc71" },
  4: { icon: "far fa-times-circle", color: "#e74c3c" },
  5: { icon: "far fa-redo", color: "#9b59b6" }
};

const STATUS = {
  1: "To do",
  2: "In Test",
  3: "Passed",
  4: "Failed",
  5: "Retest"
};

const Container = styled.div`
  display: flex;
`;

const StatusIcon = styled.i`
  ${({ type, color }) => css`
    font-size: 18px;
    color: ${color};
    margin-right: 10px;
  `};
`;



const Status = ({ status }) => {
  const [hidden, setHidden] = useState(true)

  const onToggle = e => setHidden(!hidden)

  console.log(hidden)
  return (
    <Dropdown>
      <DropdownItem onClick={onToggle}>
        <StatusIcon
          color={ICON_FOR_STATUS[status].color}
          className={ICON_FOR_STATUS[status].icon}
        />
      </DropdownItem>
      <DropdownMenu hidden={hidden} toggle={onToggle}>
        {_.map(STATUS, (item, i) => (
          <DropdownItem>
            <Container>
              <StatusIcon
                color={ICON_FOR_STATUS[i].color}
                className={ICON_FOR_STATUS[i].icon}
              />
              {STATUS[i]}

            </Container>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

export default Status
