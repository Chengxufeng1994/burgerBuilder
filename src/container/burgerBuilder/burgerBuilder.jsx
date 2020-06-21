import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import axios from '../../api/axios';
import Aux from '../../hoc/aux/aux';
import Burger from '../../components/burger/burger';
import BurgerControls from '../../components/burger/burgerControls/burgerControls';
import Modal from '../../components/ui/modal/modal';
import OrderSummary from '../../components/burger/orderSummary/oredrSummary';
import Spinner from '../../components/ui/spinner/spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {
  initIngredients,
  addIngredient,
  removeIngredient,
  purchaseInit,
  setAuthRedirectPath,
} from '../../actions';

export const BurgerBuilder = (props) => {
  const {
    initPurchase,
    initIngredients,
    ingredients,
    totalPrice,
    addIngredient,
    removeIngredient,
    error,
    isAuthenticated,
    setAuthRedirectPath,
  } = props;
  const disabledInfo = { ...ingredients };
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    initIngredients();
  }, [initIngredients]);

  const updatePuchasableState = (ingredients) => {
    const sum = Object.keys(ingredients).reduce((sum, el) => {
      return sum + ingredients[el];
    }, 0);

    return sum > 0;
  };

  const handlePurchase = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      setAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  };

  const handlePurchaseClose = () => {
    setPurchasing(false);
  };

  const handlePurchaseContinue = () => {
    const queryParams = [];

    initPurchase();

    for (let i in ingredients) {
      queryParams.push(
        encodeURIComponent(i) + '=' + encodeURIComponent(ingredients[i])
      );
    }
    queryParams.push('price=' + totalPrice);

    const queryString = queryParams.join('&');

    props.history.push({
      pathname: '/checkout',
      search: '?' + queryString,
    });
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;
  let burger = error ? <p> ingredients can't loaded </p> : <Spinner />;

  if (ingredients) {
    orderSummary = (
      <OrderSummary
        ingredients={ingredients}
        totalPrice={totalPrice}
        handlePurchaseClosed={handlePurchaseClose}
        handlePurchaseContinued={handlePurchaseContinue}
      />
    );
  }

  if (ingredients) {
    burger = (
      <Aux>
        <Burger ingredients={ingredients} />
        <BurgerControls
          disabledInfo={disabledInfo}
          purchasble={updatePuchasableState(ingredients)}
          totalPrice={totalPrice}
          handleAddIngredient={addIngredient}
          handleRemoveIngredient={removeIngredient}
          handlePurchase={handlePurchase}
          isAuth={isAuthenticated}
        />
      </Aux>
    );
  }

  return (
    <Aux>
      <Modal show={purchasing} handleModalClosed={handlePurchaseClose}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    initIngredients: () => dispatch(initIngredients()),
    addIngredient: (ingredientName) => dispatch(addIngredient(ingredientName)),
    removeIngredient: (ingredientName) =>
      dispatch(removeIngredient(ingredientName)),
    initPurchase: () => dispatch(purchaseInit()),
    setAuthRedirectPath: (path) => dispatch(setAuthRedirectPath(path)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));
