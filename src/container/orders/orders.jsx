import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../api/axios';
import Order from '../../components/order/order';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/ui/spinner/spinner';
import { fetchOrders } from '../../actions';
class Orders extends Component {
  // state = {
  //   orders: [],
  //   loading: true,
  // };

  componentDidMount() {
    const { fetchOrders } = this.props;
    fetchOrders();
    // axios
    //   .get('/orders.json')
    //   .then((response) => {
    //     console.log(response.data);
    //     const fetchedOrders = [];
    //     for (let key in response.data) {
    //       fetchedOrders.push({ ...response.data[key], id: key });
    //     }
    //     console.log(fetchedOrders);
    //     this.setState({ loading: false, orders: fetchedOrders });
    //   })
    //   .catch((error) => console.log(error));
  }

  render() {
    const { orders, loading } = this.props;

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
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
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
