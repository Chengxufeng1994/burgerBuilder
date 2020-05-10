import React from 'react';
import styled from 'styled-components';

import NavigationItem from './navigationItem/navigationItem';

const Styled = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  display: flex;
  align-items: center;
  height: 100%;
`;

const NavigationItems = (props) => {
  return (
    <Styled>
      <NavigationItem link={'/'} active>
        Burger Builder
      </NavigationItem>
      <NavigationItem link={'/'}>Checkout</NavigationItem>
    </Styled>
  );
};

export default NavigationItems;
