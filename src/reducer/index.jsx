import { combineReducers } from 'redux';
import burgerBuilderReducer from './burgerBuilderReducer';

export default combineReducers({
  burgerBuilder: burgerBuilderReducer,
});
