import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/layout/layout';
import BurgerBuilder from './container/burgerBuilder/burgerBuilder';
import AuthLogout from './container/auth/logout/logout';
import { authCheckState } from './actions';

const Checkout = lazy(() => {
  return import('./container/checkout/checkout');
});
const Orders = lazy(() => {
  return import('./container/orders/orders');
});
const Auth = lazy(() => {
  return import('./container/auth/auth');
});

const App = (props) => {
  const { onTryAutoSignup, isAuthenticated } = props;

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  return (
    <div>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          {isAuthenticated ? (
            <Switch>
              <Route
                path="/checkout"
                render={(props) => <Checkout {...props} />}
              />
              <Route path="/orders" render={(props) => <Orders {...props} />} />
              <Route path="/logout" component={AuthLogout} />
              <Route path="/auth" render={(props) => <Auth {...props} />} />
              <Route path="/" exact component={BurgerBuilder} />
              <Redirect to="/" />
            </Switch>
          ) : (
            <Switch>
              <Route path="/auth" render={(props) => <Auth {...props} />} />
              <Route path="/" exact component={BurgerBuilder} />
              <Redirect to="/" />
            </Switch>
          )}
        </Suspense>
      </Layout>
    </div>
  );
};

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
