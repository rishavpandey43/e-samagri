import * as actionTypes from '../actions/types/actionTypes';

const initialState = {
  isLoading: false,
  products: null,
  successMessage: null,
  errMessage: null,
};

const products = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: action.products,
        successMessage: action.message,
      };
    case actionTypes.GET_PRODUCTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        products: null,
        errMessage: action.message,
      };
    default:
      return {
        ...state,
      };
  }
};

export default products;
