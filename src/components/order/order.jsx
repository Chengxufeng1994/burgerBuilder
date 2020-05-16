import React from 'react';
import styled from 'styled-components';

const StyledOrder = styled.div`
  width: 80%;
  border: 1px solid #ccc;
  box-shadow: 0 2px 3px #eee;
  padding: 10px;
  margin: 10px auto;
  box-sizing: border-box;
`;

const Order = (props) => {
  const { ingredients, price } = props;
  const orderIngredients = [];

  for (let ingredientName in ingredients) {
    orderIngredients.push({
      name: ingredientName,
      amount: ingredients[ingredientName],
    });
  }

  return (
    <StyledOrder>
      <p>
        Ingredients:
        {orderIngredients.map((orderIngredient) => {
          return (
            <span
              key={orderIngredient.name}
              style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px',
              }}
            >
              {orderIngredient.name} ({orderIngredient.amount})
            </span>
          );
        })}
      </p>
      <p>
        Proce: <strong>USD: {Number.parseFloat(price).toFixed(2)}</strong>
      </p>
    </StyledOrder>
  );
};

export default Order;
