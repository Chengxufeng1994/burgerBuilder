import React, { Component } from 'react';

import Aux from '../../hoc/aux';
import Burger from '../../components/burger/burger';
import BurgerControls from '../../components/burger/burgerControls/burgerControls';
import Modal from '../../components/ui/modal/modal';
import OrderSummary from '../../components/burger/orderSummary/oredrSummary';

const INGREDIENTS_PRICE = {
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
  salad: 0.5,
};
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      bacon: 0,
      cheese: 0,
      meat: 0,
      salad: 0,
    },
    totalPrice: 4,
    purchasble: false,
    purchasing: false,
  };

  updatePuchasableState = (ingredients) => {
    const sum = Object.keys(ingredients).reduce((sum, el) => {
      return sum + ingredients[el];
    }, 0);

    this.setState({ purchasble: sum > 0 });
  };

  handleAddIngredient = (type) => {
    const { ingredients, totalPrice } = this.state;
    const oldCount = ingredients[type];
    const newCount = oldCount + 1;
    const newIngredients = { ...ingredients };
    newIngredients[type] = newCount;
    const priceAddition = INGREDIENTS_PRICE[type];
    const oldPrice = totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: newIngredients });
    this.updatePuchasableState(newIngredients);
  };

  handleRemoveIngredient = (type) => {
    const { ingredients, totalPrice } = this.state;
    const oldCount = ingredients[type];
    if (oldCount <= 0) return;
    const newCount = oldCount - 1;
    const newIngredients = { ...ingredients };
    newIngredients[type] = newCount;

    const priceDeduction = INGREDIENTS_PRICE[type];
    const oldPrice = totalPrice;
    if (oldPrice === 4) return;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: newIngredients });
    this.updatePuchasableState(newIngredients);
  };

  handlePurchase = () => {
    this.setState({ purchasing: true });
  };

  handlePurchaseClose = () => {
    this.setState({ purchasing: false });
  };

  render() {
    const { ingredients, totalPrice, purchasble, purchasing } = this.state;
    const disabledInfo = { ...ingredients };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Aux>
        <Modal show={purchasing} handleModalClosed={this.handlePurchaseClose}>
          <OrderSummary ingredients={ingredients} />
        </Modal>
        <Burger ingredients={ingredients} />
        <BurgerControls
          disabledInfo={disabledInfo}
          purchasble={purchasble}
          totalPrice={totalPrice}
          handleAddIngredient={this.handleAddIngredient}
          handleRemoveIngredient={this.handleRemoveIngredient}
          handlePurchase={this.handlePurchase}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
