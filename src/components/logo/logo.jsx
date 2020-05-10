import React from 'react';
import styled from 'styled-components';

import BurgerLogo from '../../assets/images/burger-logo.png';

const StyledLogo = styled.div`
  height: 80%;
  padding: 8px;
  background-color: white;
  border-radius: 5px;
  box-sizing: border-box;

  img {
    height: 100%;
  }
`;

const Logo = (props) => {
  return (
    <StyledLogo>
      <img src={BurgerLogo} alt="Burger Logo" />
    </StyledLogo>
  );
};

export default Logo;
