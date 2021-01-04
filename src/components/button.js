import React from 'react';

import {TouchableHighlight} from 'react-native';
import styled from 'styled-components/native';

export const Button = ({onPress, color, ...props}) => {
  return (
    <StyledButton {...props} onPress={onPress}>
      <StyledTitle {...props}>{props.title}</StyledTitle>
    </StyledButton>
  );
};

const StyledTitle = styled.Text`
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  letter-spacing: 3;
  color: ${(props) =>
    props.transparent ? (props.blue ? '#00e0ff' : '#f3f8ff') : '#666'};
`;

const StyledButton = styled.TouchableHighlight`
    width:250px;
    background-color:${(props) =>
      props.transparent ? 'transparent' : '#f3f8ff'};
    padding:15px;
    border:${(props) =>
      props.transparent
        ? `1px solid ${props.blue ? '#00e0ff' : '#f3f8ff'} `
        : 0}
    justify-content:center;
    margin-bottom:20px;
    border-radius:24px
`;

export default Button;
