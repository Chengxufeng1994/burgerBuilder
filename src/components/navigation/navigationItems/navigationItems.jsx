import React from 'react';
import styled from 'styled-components';

import NavigationItem from './navigationItem/navigationItem';

const Styled = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  display: flex;
  flex-flow: column;
  align-items: center;
  height: 100%;

  @media (min-width: 500px) {
    flex-flow: row;
  }
`;

const NavigationItems = (props) => {
  const { isAuthenticated } = props;
  return (
    <Styled>
      <NavigationItem link={'/'} exact>
        Burger Builder
      </NavigationItem>
      {isAuthenticated ? (
        <NavigationItem link={'/orders'}>Orders</NavigationItem>
      ) : null}
      {!isAuthenticated ? (
        <NavigationItem link={'/auth'}>Authenticate</NavigationItem>
      ) : (
        <NavigationItem link={'/logout'}>Logout</NavigationItem>
      )}
      {/* <NavigationItem link={'/auth'}>Authenticate</NavigationItem> */}
    </Styled>
  );
};

export default NavigationItems;
