import React from 'react';
import styled from 'styled-components';

import Logo from '../../logo/logo';
import NavigationItems from '../navigationItems/navigationItems';
import DrawerToggle from '../sideDrawer/drawerToggle/drawerToggle';

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
    .desktoponly {
      display: none;
    }
  }
`;

const Toolbar = (props) => {
  const { handelSideDrawerToggle } = props;
  return (
    <StyledToolbar>
      <DrawerToggle handelSideDrawerToggle={handelSideDrawerToggle} />
      <Logo height={80} />
      <nav className="desktoponly">
        <NavigationItems />
      </nav>
    </StyledToolbar>
  );
};

export default Toolbar;
