import * as actionTypes from './types';
import axios from '../api/axios';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    id: id,
    payload: orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    payload: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (orderData) => (dispatch) => {
  dispatch(purchaseBurgerStart());
  axios
    .post('/orders.json', orderData)
    .then((response) => {
      console.log(response.data);
      dispatch(purchaseBurgerSuccess(response.data.name, orderData));
    })
    .catch((error) => dispatch(purchaseBurgerFail(error)));
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_INIT,
  };
};

export const fetchOrders = () => async (dispatch) => {
  dispatch({
    type: actionTypes.FETCH_ORDERS_START,
  });
  await axios
    .get('/orders.json')
    .then((response) => {
      // console.log(response);
      const fetchedOrders = [];
      for (let key in response.data) {
        fetchedOrders.push({ ...response.data[key], id: key });
      }
      // for (let [key, value] of Object.entries(response.data)) {
      //   console.log(key, value);
      // }
      // console.log(fetchedOrders);
      dispatch({
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        payload: fetchedOrders,
      });
    })
    .catch((error) =>
      dispatch({
        type: actionTypes.FETCH_ORDERS_FAIL,
        payload: error,
      })
    );
};
