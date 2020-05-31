import * as actionTypes from '../actions/types';
import { updateObject } from '../util/reduceUtility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
};
const INGREDIENTS_PRICE = {
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
  salad: 0.5,
};
const addIngredient = (state, action) => {
  const updateIngredient = {
    [action.payload]: state.ingredients[action.payload] + 1,
  };
  const updateIngredients = updateObject(state.ingredients, updateIngredient);
  const updateState = {
    ingredients: updateIngredients,
    totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.payload],
  };
  return updateObject(state, updateState);
};
const removeIngredient = (state, action) => {
  const updateIngredient = {
    [action.payload]: state.ingredients[action.payload] - 1,
  };
  const updateIngredients = updateObject(state.ingredients, updateIngredient);
  const updateState = {
    ingredients: updateIngredients,
    totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.payload],
  };
  return updateObject(state, updateState);
};
const initIngredients = (state, action) => {
  const initObject = {
    ingredients: {
      salad: action.payload.salad,
      bacon: action.payload.bacon,
      cheese: action.payload.cheese,
      meat: action.payload.meat,
    },
    totalPrice: 4,
    error: false,
  };

  return updateObject(state, initObject);
};
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_INGREDIENTS: {
      return initIngredients(state, action);
      // return {
      //   ...state,
      //   ingredients: {
      //     salad: action.payload.salad,
      //     bacon: action.payload.bacon,
      //     cheese: action.payload.cheese,
      //     meat: action.payload.meat,
      //   },
      //   totalPrice: 4,
      //   error: false,
      // };
      // const initObject = {
      //   ingredients: {
      //     salad: action.payload.salad,
      //     bacon: action.payload.bacon,
      //     cheese: action.payload.cheese,
      //     meat: action.payload.meat,
      //   },
      //   totalPrice: 4,
      //   error: false,
      // };
      // return updateObject(state, initObject);
    }
    case actionTypes.FETCH_INGREDIENTS_FAIL: {
      return updateObject(...state, { error: true });
      // return { ...state, error: true };
    }
    case actionTypes.ADD_INGREDIENT: {
      return addIngredient(state, action);
      // const updateIngredient = {
      //   [action.payload]: state.ingredients[action.payload] + 1,
      // };
      // const updateIngredients = updateObject(
      //   state.ingredients,
      //   updateIngredient
      // );
      // const updateState = {
      //   ingredients: updateIngredients,
      //   totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.payload],
      // };
      // return updateObject(state, updateState);
      // return {
      //   ...state,
      //   ingredients: updateIngredients,
      //   totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.payload],
      // };
    }
    case actionTypes.REMOVE_INGREDIENT: {
      return removeIngredient(state, action);
      // const updateIngredient = {
      //   [action.payload]: state.ingredients[action.payload] - 1,
      // };
      // const updateIngredients = updateObject(
      //   state.ingredients,
      //   updateIngredient
      // );
      // const updateState = {
      //   ingredients: updateIngredients,
      //   totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.payload],
      // };
      // return updateObject(state, updateState);
      // return {
      //   ...state,
      //   ingredients: updateIngredients,
      //   totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.payload],
      // };
    }
    default:
      return state;
  }
};
