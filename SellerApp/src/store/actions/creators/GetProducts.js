import * as actionTypes from '../types/actionTypes';
import axios from 'axios';

import * as helper from '../../../utils/helper';

export const getProductsRequest = () => {
  return {
    type: actionTypes.GET_PRODUCTS_REQUEST,
  };
};

export const getProductsSuccess = response => {
  return {
    type: actionTypes.GET_PRODUCTS_SUCCESS,
    products: response.products,
    message: response.message,
  };
};

export const getProductsFailure = response => {
  return {
    type: actionTypes.GET_PRODUCTS_FAILURE,
    message: response.message,
  };
};

export const getProductsFetch = () => dispatch => {
  const sellerId = 0;
  dispatch(getProductsRequest());
  axios
    .get('http://192.168.43.240:3000/product')
    .then(response => {
      products = helper.filterProductBySeller(sellerId, response.data);
      setTimeout(() => {
        dispatch(getProductsSuccess({products}));
      }, 1000);
    })
    .catch(error => {
      dispatch(
        getProductsFailure({
          message:
            error.response ||
            "Connection to server couldn't be established, please try again",
        }),
      );
    });
};
