import axios from 'axios';
import * as actionTypes from '../types/actionTypes';

import {baseUrl} from '../../../utils/constant';

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

export const getOrdersFetch = token => dispatch => {
  dispatch(getOrdersRequest());
  axios
    .get(baseUrl + '/order/get-all-orders-seller', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      dispatch(getOrdersSuccess({orders: [...res.data.orders]}));
    })
    .catch(err => {
      console.log(err);
      dispatch(
        getOrdersFailure({
          message: err.response
            ? err.response.data.errMessage || 'Internal Server Error'
            : 'Internal Server Error',
        }),
      );
    });
};
