import React from 'react';
import styled from 'styled-components';

import NavigationItems from '../navigationItems/navigationItems';
import Logo from '../../logo/logo';
import Aux from '../../../hoc/aux/aux';
import Backdrop from '../../ui/backdrop/backdrop';

const StyledSideDrawer = styled.div`
  background-color: white;
  position: fixed;
  left: 0;
  top: 0;
  width: 280px;
  max-width: 70%;
  height: 100%;
  z-index: 200;
  padding: 32px 16px;
  box-sizing: border-box;
  transition: transform 0.3s ease-out;

  @media (min-width: 500px) {
    display: none;
  }

  &.open {
    transform: translateX(0);
  }

  &.close {
    transform: translateX(-100%);
  }
`;

const SideDrawer = (props) => {
  const { sideDrawerShow, handelSideDrawerClose, isAuth } = props;

  return (
    <Aux>
      <Backdrop show={sideDrawerShow} handleClosed={handelSideDrawerClose} />
      <StyledSideDrawer
        className={sideDrawerShow ? 'open' : 'close'}
        onClick={handelSideDrawerClose}
      >
        <Logo height={11} sideDrawer />
        <nav>
          <NavigationItems isAuthenticated={isAuth} />
        </nav>
      </StyledSideDrawer>
    </Aux>
  );
};

export default SideDrawer;
