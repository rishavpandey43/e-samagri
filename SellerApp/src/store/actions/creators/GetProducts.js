import * as actionTypes from '../types/actionTypes';
import axios from 'axios';

import * as helper from '../../../utils/helper';

export const getProductRequest = () => {
  return {
    type: actionTypes.GET_PRODUCT_REQUEST,
  };
};

export const getProductSuccess = response => {
  return {
    type: actionTypes.GET_PRODUCT_SUCCESS,
    product: response.product,
    message: response.message,
  };
};

export const getProductFailure = response => {
  return {
    type: actionTypes.GET_PRODUCT_FAILURE,
    message: response.message,
  };
};

export const getProductFetch = () => dispatch => {
  const sellerId = 0;
  dispatch(getProductRequest());
  axios
    .get('http://192.168.43.240:3000/product')
    .then(response => {
      product = helper.filterBySeller(sellerId, response.data);
      setTimeout(() => {
        dispatch(getProductSuccess({product}));
      }, 1000);
    })
    .catch(error => {
      dispatch(
        getProductFailure({
          message: error.response || 'No Internet Connection',
        }),
      );
    });
};
