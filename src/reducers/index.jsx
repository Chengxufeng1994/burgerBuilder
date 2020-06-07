import { combineReducers } from 'redux';
import burgerBuilderReducer from './burgerBuilderReducer';
import orderReducer from './orderReducer';
import authReducer from './authReducer';

export default combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer,
});
