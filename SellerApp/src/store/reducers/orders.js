import * as actionTypes from '../actions/types/actionTypes';

const initialState = {
  isLoading: false,
  orders: null,
  successMessage: null,
  errMessage: null,
};

const orders = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ORDERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.GET_ORDERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: action.orders,
        successMessage: action.message,
      };
    case actionTypes.GET_ORDERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        orders: null,
        errMessage: action.message,
      };
    default:
      return {
        ...state,
      };
  }
};

export default orders;
