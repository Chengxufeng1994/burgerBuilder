import React, { useState, useEffect, useCallback } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

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
// const INGREDIENTS_PRICE = {
//   bacon: 0.7,
//   cheese: 0.4,
//   meat: 1.3,
//   salad: 0.5,
// };
export const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);
  const dispatch = useDispatch();
  const onInitIngredients = useCallback(() => dispatch(initIngredients()), [dispatch]);
  const onInitPurchase = () => dispatch(purchaseInit());
  const onAddIngredient = (ingredientName) => dispatch(addIngredient(ingredientName));
  const onRemoveIngredient = (ingredientName) => dispatch(removeIngredient(ingredientName));
  const onSetAuthRedirectPath = (path) => dispatch(setAuthRedirectPath(path));
  const ingredients = useSelector((state) => state.burgerBuilder.ingredients);
  const totalPrice = useSelector((state) => state.burgerBuilder.totalPrice);
  const error = useSelector((state) => state.burgerBuilder.error);
  const isAuthenticated = useSelector(
    (state) => state.burgerBuilder.isAuthenticated
  );

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePuchasableState = (ingredients) => {
    const sum = Object.keys(ingredients).reduce((sum, el) => {
      return sum + ingredients[el];
    }, 0);

    return sum > 0;
  };

  // handleAddIngredient = (type) => {
  //   const { ingredients, totalPrice } = this.props;
  //   const oldCount = ingredients[type];
  //   const newCount = oldCount + 1;
  //   const newIngredients = { ...ingredients };
  //   newIngredients[type] = newCount;
  //   const priceAddition = INGREDIENTS_PRICE[type];
  //   const oldPrice = totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({ totalPrice: newPrice, ingredients: newIngredients });
  //   this.updatePuchasableState(newIngredients);
  // };

  // handleRemoveIngredient = (type) => {
  //   const { ingredients, totalPrice } = this.props;
  //   const oldCount = ingredients[type];
  //   if (oldCount <= 0) return;
  //   const newCount = oldCount - 1;
  //   const newIngredients = { ...ingredients };
  //   newIngredients[type] = newCount;

  //   const priceDeduction = INGREDIENTS_PRICE[type];
  //   const oldPrice = totalPrice;
  //   if (oldPrice === 4) return;
  //   const newPrice = oldPrice - priceDeduction;
  //   this.setState({ totalPrice: newPrice, ingredients: newIngredients });
  //   this.updatePuchasableState(newIngredients);
  // };

  const handlePurchase = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  };
  const handlePurchaseClose = () => setPurchasing(false);
  const handlePurchaseContinue = () => {
    // this.setState({ loading: true });
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'Benny Cheng',
    //     address: {
    //       street: 'Testreet 1',
    //       zipcode: 236,
    //       country: 'Taipei',
    //     },
    //     email: 'Benny@gmail.com',
    //   },
    //   deliveryMethod: 'fastest',
    // };
    // axios
    //   .post('/order.json', order)
    //   .then((response) => {
    //     console.log(response);
    //     this.setState({ loading: false, purchasing: false });
    //   })
    //   .catch((error) => this.setState({ loading: false, purchasing: false }));
    const queryParams = [];

    onInitPurchase();

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

  const disabledInfo = { ...ingredients };
  let orderSummary = null;
  let burger = error ? <p> ingredients can't loaded </p> : <Spinner />;

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

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
          handleAddIngredient={onAddIngredient}
          handleRemoveIngredient={onRemoveIngredient}
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

// const mapStateToProps = (state) => {
//   return {
//     ingredients: state.burgerBuilder.ingredients,
//     totalPrice: state.burgerBuilder.totalPrice,
//     error: state.burgerBuilder.error,
//     isAuthenticated: state.auth.token !== null,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     initIngredients: () => dispatch(initIngredients()),
//     addIngredient: (ingredientName) => dispatch(addIngredient(ingredientName)),
//     removeIngredient: (ingredientName) =>
//       dispatch(removeIngredient(ingredientName)),
//     initPurchase: () => dispatch(purchaseInit()),
//     setAuthRedirectPath: (path) => dispatch(setAuthRedirectPath(path)),
//   };
// };
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(WithErrorHandler(BurgerBuilder, axios));
export default WithErrorHandler(BurgerBuilder, axios);
