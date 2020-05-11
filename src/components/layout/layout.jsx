import React, { useState } from 'react';
import styled from 'styled-components';

import Aux from '../../hoc/aux';
import Toolbar from '../navigation/toolbar/toolbar';
import SideDrawer from '../navigation/sideDrawer/sideDrawer';

const Main = styled.main`
  margin-top: 72px;
`;

const Layout = (props) => {
  const [sideDrawerShow, setSideDrawerShow] = useState(false);

  function handelSideDrawerToggle() {
    setSideDrawerShow(!sideDrawerShow);
  }

  function handelSideDrawerClose() {
    setSideDrawerShow(false);
  }

  return (
    <Aux>
      <Toolbar handelSideDrawerToggle={handelSideDrawerToggle} />
      <SideDrawer
        handelSideDrawerClose={handelSideDrawerClose}
        sideDrawerShow={sideDrawerShow}
      />
      <Main>{props.children}</Main>
    </Aux>
  );
};

export default Layout;
