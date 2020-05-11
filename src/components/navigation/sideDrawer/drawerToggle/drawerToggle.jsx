import React from 'react';
import styled from 'styled-components';

const HamburgerIcon = styled.div`
  width: 40px;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  box-sizing: border-box;
  cursor: pointer;

  div {
    width: 90%;
    height: 3px;
    background-color: white;
  }

  @media (min-width: 500px) {
    display: none;
  }
`;
const DrawerToggle = (props) => {
  const { handelSideDrawerToggle } = props;

  return (
    <HamburgerIcon onClick={handelSideDrawerToggle}>
      <div></div>
      <div></div>
      <div></div>
    </HamburgerIcon>
  );
};

export default DrawerToggle;
