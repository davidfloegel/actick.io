import React from "react";
import styled, { css } from "styled-components";

const Navbar = styled.div`
  height: 50px;
  background: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  font-weight: bold;
  z-index: 999;
`;

export default () => <Navbar>Describe</Navbar>;
