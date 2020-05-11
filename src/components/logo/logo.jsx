import React from 'react';
import styled from 'styled-components';

import BurgerLogo from '../../assets/images/burger-logo.png';

const StyledLogo = styled.div`
  height: ${(props) => (props.height ? props.height : 100)}%;
  padding: 8px;
  margin-bottom ${(props) => (props.sideDrawer ? 32 : 0)}px;
  background-color: white;
  border-radius: 5px;
  box-sizing: border-box;

  img {
    height: 100%;
  }
`;

const Logo = (props) => {
  return (
    <StyledLogo height={props.height} sideDrawer={props.sideDrawer}>
      <img src={BurgerLogo} alt="Burger Logo" />
    </StyledLogo>
  );
};

export default Logo;
