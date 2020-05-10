import React from 'react';

import Aux from '../../../hoc/aux';
import { Button } from '../../ui/button/button';

const OredrSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:
        {props.ingredients[igKey]}
      </li>
    );
  });

  const { handlePurchaseClosed, handlePurchaseContinued } = props;

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
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
