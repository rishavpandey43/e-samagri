import {combineReducers} from 'redux';

import auth from './auth';
import profile from './profile';
import sellers from './sellers';
import store from './store';
import cart from './cart';
import orders from './orders';

const rootReducer = combineReducers({
  auth,
  profile,
  sellers,
  store,
  cart,
  orders,
});

export default rootReducer;
