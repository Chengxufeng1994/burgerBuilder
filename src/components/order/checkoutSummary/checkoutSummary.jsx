import React from 'react';
import styled from 'styled-components';

import Burger from '../../burger/burger';
import { Button } from '../../ui/button/button';

const StyledCheckoutSummary = styled.div`
  text-align: center;
  width: 80%;
  margin: auto;

  // @media (min-width: 600px) {
  //   width: 500px;
  // }
`;

const CheckoutSummary = (props) => {
  const { ingredients, checkoutCancelled, checkoutContinued } = props;
  return (
    <StyledCheckoutSummary>
      <h1>We hope it tastes well!!!</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={ingredients} />
      </div>
      <Button danger onClick={checkoutCancelled}>
        CANCEL
      </Button>
      <Button success onClick={checkoutContinued}>
        CONTINUE
      </Button>
    </StyledCheckoutSummary>
  );
};

export default CheckoutSummary;
