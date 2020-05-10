import React from 'react';
import styled from 'styled-components';

import Aux from '../../hoc/aux';
import Toolbar from '../navigation/toolbar/toolbar';

const Main = styled.main`
  margin-top: 72px;
`;

const Layout = (props) => {
  return (
    <Aux>
      <Toolbar />
      <Main>{props.children}</Main>
    </Aux>
  );
};

export default Layout;
