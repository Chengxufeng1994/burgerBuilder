import React from 'react';
import styled from 'styled-components';

import Aux from '../../hoc/aux';
import Toolbar from '../navigation/toolbar/toolbar';
import SideDrawer from '../navigation/sideDrawer/sideDrawer';

const Main = styled.main`
  margin-top: 72px;
`;

const Layout = (props) => {
  return (
    <Aux>
      <Toolbar />
      <SideDrawer />
      <Main>{props.children}</Main>
    </Aux>
  );
};

export default Layout;
