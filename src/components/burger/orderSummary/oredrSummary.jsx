import React from 'react';

import Aux from '../../../hoc/aux/aux';
import { Button } from '../../ui/button/button';

const OredrSummary = (props) => {
  const {
    handlePurchaseClosed,
    handlePurchaseContinued,
    totalPrice,
    ingredients,
  } = props;
  const ingredientSummary = Object.keys(ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:
        {ingredients[igKey]}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        TotalPrice: <strong>{totalPrice.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout ?</p>
      <Button danger onClick={handlePurchaseClosed}>
        CNACEL
      </Button>
      <Button success onClick={handlePurchaseContinued}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default OredrSummary;
