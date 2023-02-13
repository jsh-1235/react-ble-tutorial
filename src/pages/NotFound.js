import React from "react";

import styled from "styled-components";

const CONTAINER = styled.div`
  display: flex;
  flex-direction: column;
  align-content: stretch;
  justify-content: space-around;
  align-items: center;

  align-self: stretch;
  justify-self: stretch;
  grid-column: 1 / span 2;

  background-color: #34515e;
  color: white;
`;

const HEADER = styled.span`
  box-shadow: 0px 0px 20px 20px #439889;
  background-color: #439889;
  font-size: 5rem;
  padding: 0px;
  margin: 0px;
`;

const LINK = styled.a`
  text-decoration: none;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.25);
  color: white;
  padding: 10px;

  &:hover {
    background-color: #42a5f5;
    transition-property: background-color;
    transition-duration: 0.5s;
  }

  &:active {
    background-color: #0077c2;
    transition-property: background-color;
    transition-duration: 0.5s;
  }
`;

export default function NotFound() {
  return (
    <CONTAINER>
      <HEADER>404 Not Found</HEADER>
      <LINK href="/">Go to Home</LINK>
    </CONTAINER>
  );
}
