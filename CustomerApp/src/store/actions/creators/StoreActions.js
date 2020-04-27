import * as actionTypes from '../types/actionTypes';

export const selectStore = store => {
  return {
    type: actionTypes.SELECT_STORE,
    store: {...store},
  };
};
