import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/order/checkoutSummary/checkoutSummary';
import ContactData from './contactData/contactData';

class Checkout extends Component {
  // state = {
  //   ingredients: null,
  //   totalPrice: 0,
  // };

  // componentWillMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price = 0;

  //   for (let param of query.entries()) {
  //     // ['salad', '1']
  //     if (param[0] === 'price') {
  //       price = param[1];
  //     } else {
  //       ingredients[param[0]] = +param[1];
  //     }
  //   }

  //   this.setState({ ingredients: ingredients, totalPrice: price });
  // }
  handleCheckoutCancelled = () => {
    this.props.history.goBack();
  };

  handleCheckoutContinued = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    const { ingredients, purchased } = this.props;

    return ingredients && !purchased ? (
      <div>
        <CheckoutSummary
          ingredients={ingredients}
          checkoutCancelled={this.handleCheckoutCancelled}
          checkoutContinued={this.handleCheckoutContinued}
        />
        <Route
          path={this.props.match.url + '/contact-data'}
          component={ContactData}
          // render={() => (
          //   <ContactData
          //     ingredients={ingredients}
          //     price={totalPrice}
          //     {...this.props}
          //   />
          // )}
        />
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
