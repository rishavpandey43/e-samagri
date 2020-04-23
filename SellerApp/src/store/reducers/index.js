import {combineReducers} from 'redux';

import profile from './profile';
import products from './products';
import orders from './orders';

const rootReducer = combineReducers({
  products,
  profile,
  orders,
});

export default rootReducer;
