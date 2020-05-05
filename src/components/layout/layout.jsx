import React from 'react';
import styled from 'styled-components';

import Aux from '../../hoc/aux';

const Main = styled.main`
  margin-top: 16px;
`;

const Layout = (props) => {
  return (
    <Aux>
      <div>Toolbar, SideDrawer, Backdrop</div>
      <Main>{props.children}</Main>
    </Aux>
  );
};

export default Layout;
