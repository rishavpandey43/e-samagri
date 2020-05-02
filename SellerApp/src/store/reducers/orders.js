import * as actionTypes from '../actions/types/actionTypes';

const initialState = {
  fetchingOrders: false,
  orders: [],
  errMessage: null,
};

const orders = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ORDERS_REQUEST:
      return {
        ...state,
        fetchingOrders: true,
      };
    case actionTypes.GET_ORDERS_SUCCESS:
      return {
        ...state,
        fetchingOrders: false,
        orders: action.orders,
        errMessage: null,
      };
    case actionTypes.GET_ORDERS_FAILURE:
      return {
        ...state,
        fetchingOrders: false,
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
