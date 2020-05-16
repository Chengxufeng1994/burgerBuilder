import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/layout/layout';
import BurgerBuilder from './container/burgerBuilder/burgerBuilder';
import Checkout from './container/checkout/checkout';
import Orders from './container/orders/orders';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
