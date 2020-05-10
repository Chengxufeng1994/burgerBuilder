import React from 'react';
import styled from 'styled-components';

import BurgerControl from './burgerControl/burgerControl';

const ControlsArea = styled.div`
  width: 100%;
  background-color: #cf8f2e;
  display: flex;
  flex-flow: column;
  align-items: center;
  box-shadow: 0 2px 1px #ccc;
  margin: auto 0;
  padding: 10px 0;
`;

const controls = [
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
  { label: 'Salad', type: 'salad' },
];

const BurgerControls = (props) => {
  const {
    disabledInfo,
    handleAddIngredient,
    handleRemoveIngredient,
    totalPrice,
  } = props;

  return (
    <ControlsArea>
      {/* {Object.keys(ingredients).map((ingredient) => {
        return <BurgerControl label={ingredient} />;
      })} */}
      <p>
        Current Price: <strong>{totalPrice.toFixed(2)}</strong>
      </p>
      {controls.map((ctrl) => (
        <BurgerControl
          key={ctrl.label}
          label={ctrl.label}
          type={ctrl.type}
          disabledInfo={disabledInfo[ctrl.type]}
          handleAddIngredient={handleAddIngredient}
          handleRemoveIngredient={handleRemoveIngredient}
        />
      ))}
    </ControlsArea>
  );
};

export default BurgerControls;
