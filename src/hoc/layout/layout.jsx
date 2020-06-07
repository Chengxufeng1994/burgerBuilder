import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Aux from '../aux/aux';
import Toolbar from '../../components/navigation/toolbar/toolbar';
import SideDrawer from '../../components/navigation/sideDrawer/sideDrawer';

const Main = styled.main`
  margin-top: 72px;
`;

const Layout = (props) => {
  const [sideDrawerShow, setSideDrawerShow] = useState(false);
  const { isAuthenticated } = props;

  function handelSideDrawerToggle() {
    setSideDrawerShow(!sideDrawerShow);
  }

  function handelSideDrawerClose() {
    setSideDrawerShow(false);
  }

  return (
    <Aux>
      <Toolbar
        isAuth={isAuthenticated}
        handelSideDrawerToggle={handelSideDrawerToggle}
      />
      <SideDrawer
        isAuth={isAuthenticated}
        handelSideDrawerClose={handelSideDrawerClose}
        sideDrawerShow={sideDrawerShow}
      />
      <Main>{props.children}</Main>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
