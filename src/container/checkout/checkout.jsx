import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/order/checkoutSummary/checkoutSummary';
import ContactData from './contactData/contactData';

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;

    for (let param of query.entries()) {
      // ['salad', '1']
      if (param[0] === 'price') {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }

    this.setState({ ingredients: ingredients, totalPrice: price });
  }

  handleCheckoutCancelled = () => {
    this.props.history.goBack();
  };

  handleCheckoutContinued = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    const { ingredients, totalPrice } = this.state;

    return (
      <div>
        <CheckoutSummary
          ingredients={ingredients}
          checkoutCancelled={this.handleCheckoutCancelled}
          checkoutContinued={this.handleCheckoutContinued}
        />
        <Route
          path={this.props.match.url + '/contact-data'}
          render={() => (
            <ContactData
              ingredients={ingredients}
              price={totalPrice}
              {...this.props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;