import React from 'react';
import styled from 'styled-components';

const Styled = styled.li`
  box-sizing: border-box;
  display: block;
  margin: 10px 0;
  width: 100%;

  a {
    color: #8f5c2c;
    text-decoration: none;
    width: 100%;
    box-sizing: border-box;
    display: block;
  }

  a:hover,
  a:active,
  a.active {
    color: #40a4c8;
  }

  @meida (min-width: 500px) {
    display: flex;
    margin: 0;
    height: 100%
    width: auto;
    align-items: center;

    a {
      border-bottom: 4px solid transarent;
      color: #8f5c2c;
      padding: 16px 10px;
      width: 100%
    }

    a:hover,
    a:active,
    a.active {
      background-color: #8f5c2c
      border-bottom: 4px solid #40a4c8;
      color: #40a4c8;
    }
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
