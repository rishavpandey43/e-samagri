import * as actionTypes from '../actions/types/actionTypes';

const initialState = {
  cart: null,
};

const store = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_NEW_PRODUCT_TO_CART:
      return {
        ...state,
        cart: {
          storeId: action.storeId,
          products: action.products,
        },
      };
    case actionTypes.INCREMENT_SAME_PRODUCT_TO_CART:
      return {
        ...state,
        cart: {
          storeId: action.storeId,
          products: action.products,
        },
      };
    case actionTypes.CHANGE_PRODUCT_QUANTITY_IN_CART:
      return {
        ...state,
        cart: {
          storeId: action.storeId,
          products: action.products,
        },
      };
    default:
      return {
        ...state,
      };
  }
};

export default store;
