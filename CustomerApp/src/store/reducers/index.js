import {combineReducers} from 'redux';

import profile from './profile';
import sellers from './sellers';
import store from './store';
import cart from './cart';

const rootReducer = combineReducers({
  profile,
  sellers,
  store,
  cart,
});

export default rootReducer;
