import React from 'react';
import styled from 'styled-components';

import Logo from '../../logo/logo';
import NavigationItems from '../navigationItems/navigationItems';

const StyledToolbar = styled.header`
  background-color: #703b09;
  height: 56px;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  z-index: 90;

  nav {
    height: 100%;
  }

  @media (max-width: 499px) {
    .deskonly {
      display: none;
    }
  }
`;

const Toolbar = (props) => {
  return (
    <StyledToolbar>
      <button onClick={props.handelSideDrawerOpen}>MENU</button>
      <Logo height={80} />
      <nav className="deskonly">
        <NavigationItems />
      </nav>
    </StyledToolbar>
  );
};

export default Toolbar;
