import * as actionTypes from '../types/actionTypes';
import axios from 'axios';

import * as helper from '../../../utils/helper';
import {baseUrl} from '../../../utils/constant';

const sellerId1 = '5e9fb135233b5b03d51de35b';
const sellerId2 = '5e9fb291df5cf41033ca39e0';
const sellerId3 = '5e9fb2a3df5cf41033ca39e1';

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
  dispatch(getProductsRequest());
  axios
    .get(baseUrl + '/seller/get-all-products', {
      params: {
        id: sellerId1,
      },
    })
    .then(res => {
      dispatch(getProductsSuccess({products: res.data.products}));
    })
    .catch(err => {
      console.log(err);
      dispatch(
        getProductsFailure({
          message: err.response
            ? err.response.data.errMessage || 'Internal Server Error'
            : 'Internal Server Error',
        }),
      );
    });
};
