import React, { Component } from 'react';
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
} from '../../actions';
// const INGREDIENTS_PRICE = {
//   bacon: 0.7,
//   cheese: 0.4,
//   meat: 1.3,
//   salad: 0.5,
// };
class BurgerBuilder extends Component {
  state = {
    // ingredients: null,
    // totalPrice: 4,
    // purchasble: false,
    purchasing: false,
    loading: false,
    // error: false,
  };

  componentDidMount() {
    console.log(this.props);
    const { initIngredients } = this.props;
    initIngredients();
    // axios
    //   .get('/ingredients.json')
    //   .then((res) => res.data)
    //   .then((data) => this.setState({ ingredients: data }))
    //   .catch((error) => {
    //     this.setState({ error: true });
    //   });
  }

  updatePuchasableState = (ingredients) => {
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

  handlePurchase = () => {
    this.setState({ purchasing: true });
  };

  handlePurchaseClose = () => {
    this.setState({ purchasing: false });
  };

  handlePurchaseContinue = () => {
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
    const { ingredients, totalPrice, initPurchase } = this.props;

    initPurchase();

    for (let i in ingredients) {
      queryParams.push(
        encodeURIComponent(i) + '=' + encodeURIComponent(ingredients[i])
      );
    }
    queryParams.push('price=' + totalPrice);

    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString,
    });
  };

  render() {
    const {
      // ingredients,
      // totalPrice,
      // purchasble,
      purchasing,
      loading,
      // error,
    } = this.state;
    const {
      ingredients,
      totalPrice,
      addIngredient,
      removeIngredient,
      error,
    } = this.props;
    const disabledInfo = { ...ingredients };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    if (ingredients) {
      orderSummary = (
        <OrderSummary
          ingredients={ingredients}
          totalPrice={totalPrice}
          handlePurchaseClosed={this.handlePurchaseClose}
          handlePurchaseContinued={this.handlePurchaseContinue}
        />
      );
    }

    if (loading) {
      orderSummary = <Spinner />;
    }
    if (ingredients) {
      orderSummary = (
        <OrderSummary
          ingredients={ingredients}
          totalPrice={totalPrice}
          handlePurchaseClosed={this.handlePurchaseClose}
          handlePurchaseContinued={this.handlePurchaseContinue}
        />
      );
    }
    if (loading) {
      orderSummary = <Spinner />;
    }

    let burger = error ? <p> ingredients can't loaded </p> : <Spinner />;

    if (ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={ingredients} />
          <BurgerControls
            disabledInfo={disabledInfo}
            purchasble={this.updatePuchasableState(ingredients)}
            totalPrice={totalPrice}
            handleAddIngredient={addIngredient}
            handleRemoveIngredient={removeIngredient}
            handlePurchase={this.handlePurchase}
          />
        </Aux>
      );
    }

    return (
      <Aux>
        <Modal show={purchasing} handleModalClosed={this.handlePurchaseClose}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    initIngredients: () => dispatch(initIngredients()),
    addIngredient: (ingredientName) => dispatch(addIngredient(ingredientName)),
    removeIngredient: (ingredientName) =>
      dispatch(removeIngredient(ingredientName)),
    initPurchase: () => dispatch(purchaseInit()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));
