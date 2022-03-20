import React from 'react'
import styled from "styled-components";

const StyledButtons = styled.button`
  font-family: Share Tech Mono;
  height: 65px;
  font-size: 20px;
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.background};
`;


function Button(props) {
  return (
    <StyledButtons id={props.name} value={props.simbol} onClick={props.onClick}>
      {props.simbol}
    </StyledButtons>
  );
}

export default Button