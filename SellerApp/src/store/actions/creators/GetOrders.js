import * as actionTypes from '../types/actionTypes';
import axios from 'axios';

import * as helper from '../../../utils/helper';

export const getOrdersRequest = () => {
  return {
    type: actionTypes.GET_ORDERS_REQUEST,
  };
};

export const getOrdersSuccess = response => {
  return {
    type: actionTypes.GET_ORDERS_SUCCESS,
    orders: response.orders,
    message: response.message,
  };
};

export const getOrdersFailure = response => {
  return {
    type: actionTypes.GET_ORDERS_FAILURE,
    message: response.message,
  };
};

export const getOrdersFetch = () => dispatch => {
  const sellerId = 0;
  dispatch(getOrdersRequest());
  axios
    .get('http://192.168.43.240:3000/order')
    .then(response => {
      orders = helper.filterOrderBySeller(sellerId, response.data);
      setTimeout(() => {
        dispatch(getOrdersSuccess({orders}));
      }, 1000);
    })
    .catch(error => {
      dispatch(
        getOrdersFailure({
          message: 'please try again',
        }),
      );
    });
};
