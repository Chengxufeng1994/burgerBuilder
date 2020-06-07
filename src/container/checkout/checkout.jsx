import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/order/checkoutSummary/checkoutSummary';
import ContactData from './contactData/contactData';

const Checkout = (props) => {
  const { ingredients, purchased } = props;

  const handleCheckoutCancelled = () => {
    props.history.goBack();
  };

  const handleCheckoutContinued = () => {
    props.history.replace('/checkout/contact-data');
  };

  return ingredients && !purchased ? (
    <div>
      <CheckoutSummary
        ingredients={ingredients}
        checkoutCancelled={handleCheckoutCancelled}
        checkoutContinued={handleCheckoutContinued}
      />
      <Route
        path={props.match.path + '/contact-data'}
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
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
