import * as actionTypes from './types';
import axios from '../api/axios';

export const initIngredients = () => (dispatch) => {
  axios
    .get('/ingredients.json')
    .then((response) => response)
    .then(({ data }) => {
      return dispatch({
        type: actionTypes.INIT_INGREDIENTS,
        payload: data,
      });
    })
    .catch((error) => {
      console.log(error)
      return dispatch({
        type: actionTypes.FETCH_INGREDIENTS_FAIL,
        payload: error,
      });
    });
  // return {
  //   type: actionTypes.INIT_INGRENDIENTS,
  //   payload: response.data,
  // };
};

export const addIngredient = (ingredientName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    payload: ingredientName,
  };
};

export const removeIngredient = (ingredientName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    payload: ingredientName,
  };
};
