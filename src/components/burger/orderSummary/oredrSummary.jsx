import React, { Component } from 'react';

import Aux from '../../../hoc/aux/aux';
import { Button } from '../../ui/button/button';

class OredrSummary extends Component {
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igKey) => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:
            {this.props.ingredients[igKey]}
          </li>
        );
      }
    );

    const {
      handlePurchaseClosed,
      handlePurchaseContinued,
      totalPrice,
    } = this.props;

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
  }
}

export default OredrSummary;
