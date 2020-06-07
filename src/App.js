import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/layout/layout';
import BurgerBuilder from './container/burgerBuilder/burgerBuilder';
import Checkout from './container/checkout/checkout';
import Orders from './container/orders/orders';
import Auth from './container/auth/auth';
import AuthLogout from './container/auth/logout/logout';

import { authCheckState } from './actions';

class App extends Component {
  componentDidMount() {
    const { onTryAutoSignup } = this.props;
    onTryAutoSignup();
  }

  render() {
    const { isAuthenticated } = this.props;

    return (
      <div>
        <Layout>
          {isAuthenticated ? (
            <Switch>
              <Route path="/checkout" component={Checkout} />
              <Route path="/orders" component={Orders} />
              <Route path="/logout" component={AuthLogout} />
              <Route path="/" exact component={BurgerBuilder} />
              <Redirect to="/" />
            </Switch>
          ) : (
            <Switch>
              <Route path="/auth" component={Auth} />
              <Route path="/" exact component={BurgerBuilder} />
              <Redirect to="/" />
            </Switch>
          )}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
