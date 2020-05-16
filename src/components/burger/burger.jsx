import React from 'react';

import styled from 'styled-components';
import BurgerIngredient, {
  BreadTop,
  Seeds1,
  Seeds2,
  BreadBottom,
} from './burgerIngredient/burgerIngredient';

const BurgerContainer = styled.div`
  width: 100%;
  margin: auto;
  height: 250px;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;

  @media (min-width: 500px) and (min-height: 400px) {
    width: 350px;
    height: 300px;
  }

  @media (min-width: 500px) and (min-height: 401px) {
    width: 450px;
    height: 400px;
  }

  @media (min-width: 1000px) and (min-height: 700px) {
    width: 700px;
    height: 600px;
  }
`;

const Burger = (props) => {
  console.log(props);
  const { ingredients } = props;
  let transformedIngredients = Object.keys(ingredients)
    .map((igKey) =>
      [...Array(ingredients[igKey])].map((_, i) => (
        <BurgerIngredient key={igKey + i} type={igKey} />
      ))
    )
    .reduce((arr, el) => arr.concat(el), []);

  return (
    <BurgerContainer>
      <BreadTop>
        <Seeds1 />
        <Seeds2 />
      </BreadTop>
      {transformedIngredients.length === 0
        ? 'Please start adding ingredients'
        : transformedIngredients}
      <BreadBottom />
    </BurgerContainer>
  );
};

export default Burger;
