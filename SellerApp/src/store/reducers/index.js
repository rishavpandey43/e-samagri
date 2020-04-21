import {combineReducers} from 'redux';

import products from './products';
import orders from './orders';

const rootReducer = combineReducers({
  products,
  orders,
});

export default rootReducer;
