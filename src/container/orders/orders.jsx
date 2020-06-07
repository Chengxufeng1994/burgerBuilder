import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import axios from '../../api/axios';
import Order from '../../components/order/order';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/ui/spinner/spinner';
import { fetchOrders } from '../../actions';

const Orders = (props) => {
  const { orders, loading, fetchOrders, token, userId } = props;

  useEffect(() => {
    fetchOrders(token, userId);
  }, [fetchOrders, token, userId]);

  return loading ? (
    <Spinner />
  ) : (
    <div>
      {orders.map((order) => {
        return (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

// const mapDispatchProps = (dispatch) => {
//   return {
//     fetchOrders: () => dispatch(fetchOrders()),
//   };
// };

export default connect(mapStateToProps, { fetchOrders })(
  WithErrorHandler(Orders, axios)
);
