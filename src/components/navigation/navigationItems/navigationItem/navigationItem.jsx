import React from 'react';
import styled from 'styled-components';

const Styled = styled.li`
  box-sizing: border-box;
  margin: 0;
  display: flex;
  align-items: center;
  height: 100%;

  a {
    color: white;
    text-decoration: none;
    height: 100%;
    padding: 16px 10px;
    border-bottom: 4px solid transparent;
    box-sizing: border-box;
    display: block;
  }

  a:hover,
  a:active,
  a.active {
    background-color: #8f5c2c;
    border-bottom: 4px solid #40a4c8;
    color: white;
  }
`;

const NavigationItem = (props) => {
  const { link, active } = props;

  return (
    <Styled>
      <a href={link} className={active ? 'active' : null}>
        {props.children}
      </a>
    </Styled>
  );
};

export default NavigationItem;
