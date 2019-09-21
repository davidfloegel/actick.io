import React from "react";
import styled, { css } from "styled-components";

const Navbar = styled.div`
  height: 50px;
  background: #fff;
  box-shadow: 0px 0px 12px -9px rgba(0, 0, 0, 0.63);

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

const Logo = styled.img`
  height: 20px;
`;

export default () => (
  <Navbar>
    <Logo src={require("./logo.png")} />
  </Navbar>
);
