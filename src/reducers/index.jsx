import { combineReducers } from 'redux';
import burgerBuilderReducer from './burgerBuilderReducer';
import orderReducer from './orderReducer';

export default combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
});
