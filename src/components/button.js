import styled, { css } from "styled-components";

export default styled.button`
  padding: 10px 25px;
  border: none;
  border-radius: 2px;
  font-size: 100%;
  color: #fff;
  cursor: pointer;

  ${({ type }) => css`
    ${!type &&
      css`
        background: #3498db;
      `};

    ${type === "danger" &&
      css`
        background: #e74c3c;
      `};

    ${type === "dangerLink" &&
      css`
        color: #e74c3c;
        background: none;
        padding-left: 0;
        padding-right: 0;
      `};
  `};
`;
