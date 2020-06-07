import * as actionTypes from '../actions/types';
import { updateObject } from '../util/utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};
const purchaseBurgerInit = (state, action) => {
  return updateObject(state, { purchased: false });
};
const purchaseBurgerStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.payload, { id: action.id });
  const updateState = {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder),
  };
  return updateObject(state, updateState);
};
const purchaseBurgerFail = (state, action) => {
  return updateObject(state, { loading: false });
};
const fetchOrdersStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, { loading: false, orders: action.payload });
};
const fetchOrdersFail = (state, action) => {
  return updateObject(state, { loading: false });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_INIT: {
      return purchaseBurgerInit(state, action);
      // return {
      //   ...state,
      //   purchased: false,
      // };
      // return updateObject(state, { purchased: false });
    }
    case actionTypes.PURCHASE_BURGER_START: {
      return purchaseBurgerStart(state, action);
      // return {
      //   ...state,
      //   loading: true,
      // };
      // return updateObject(state, { loading: true });
    }
    case actionTypes.PURCHASE_BURGER_SUCCESS: {
      return purchaseBurgerSuccess(state, action);
      // return {
      //   ...state,
      //   loading: false,
      //   purchased: true,
      //   orders: state.orders.concat(newOrder),
      // };
      // const newOrder = updateObject(action.payload, { id: action.id });
      // const updateState = {
      //   loading: false,
      //   purchased: true,
      //   orders: state.orders.concat(newOrder),
      // };
      // return updateObject(state, updateState);
    }
    case actionTypes.PURCHASE_BURGER_FAIL: {
      return purchaseBurgerFail(state, action);
      // return { ...state, loading: false };
      // return updateObject(state, { loading: false });
    }
    case actionTypes.FETCH_ORDERS_START: {
      return fetchOrdersStart(state, action);
      // return {
      //   ...state,
      //   loading: true,
      // };
      // return updateObject(state, { loading: true });
    }
    case actionTypes.FETCH_ORDERS_SUCCESS: {
      return fetchOrdersSuccess(state, action);
      // return {
      //   ...state,
      //   loading: false,
      //   orders: action.payload,
      // };
      // return updateObject(state, { loading: false, orders: action.payload });
    }
    case actionTypes.FETCH_ORDERS_FAIL: {
      return fetchOrdersFail(state, action);
      // return {
      //   ...state,
      //   loading: false,
      // };
      // return updateObject(state, { loading: false });
    }
    default:
      return state;
  }
};
