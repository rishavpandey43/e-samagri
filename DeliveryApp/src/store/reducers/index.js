import {combineReducers} from 'redux';

import auth from './auth';
import profile from './profile';
import products from './products';
import orders from './orders';

const rootReducer = combineReducers({
  auth,
  products,
  profile,
  orders,
});

export default rootReducer;
