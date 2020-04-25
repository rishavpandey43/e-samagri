import {combineReducers} from 'redux';

import profile from './profile';
import sellers from './sellers';
import store from './store';

const rootReducer = combineReducers({
  profile,
  sellers,
  store,
});

export default rootReducer;
