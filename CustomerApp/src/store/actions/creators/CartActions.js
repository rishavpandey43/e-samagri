import axios from 'axios';
import {ToastAndroid} from 'react-native';
import * as actionTypes from '../types/actionTypes';

import * as helper from '../../../utils/helper';
import {baseUrl} from '../../../utils/constant';

const customerId1 = '5ea249c95c80eb0b619658f7';
const customerId2 = '5ea249dc5c80eb0b619658f8';
const customerId3 = '5ea249e75c80eb0b619658f9';

export const addNewProductToCart = ({storeId, products, deliveryCharge}) => {
  return {
    type: actionTypes.ADD_NEW_PRODUCT_TO_CART,
    storeId,
    products,
    deliveryCharge,
  };
};

export const changeProductQuantityinCart = ({
  storeId,
  products,
  deliveryCharge,
}) => {
  return {
    type: actionTypes.CHANGE_PRODUCT_QUANTITY_IN_CART,
    storeId,
    products,
    deliveryCharge,
  };
};

export const getCartDetailRequest = () => {
  return {
    type: actionTypes.GET_CART_DETAIL_REQUEST,
  };
};

export const getCartDetailSuccess = ({storeId, products, deliveryCharge}) => {
  return {
    type: actionTypes.GET_CART_DETAIL_SUCCESS,
    storeId,
    products,
    deliveryCharge,
  };
};

export const getCartDetailFailure = response => {
  return {
    type: actionTypes.GET_CART_DETAIL_FAILURE,
    message: response.message,
  };
};

export const getCartDetailFetch = () => dispatch => {
  dispatch(getCartDetailRequest());
  axios
    .get(baseUrl + '/customer/get-cart', {
      params: {
        id: customerId2,
      },
    })
    .then(res => {
      dispatch(getCartDetailSuccess(res.data.cart));
    })
    .catch(err => {
      dispatch(
        getCartDetailFailure({
          message: err.response
            ? err.response.data.errMessage || 'Internal Server Error'
            : 'Internal Server Error',
        }),
      );
    });
};

export const updateCartToServerRequest = () => {
  return {
    type: actionTypes.UPDATE_CART_TO_SERVER_REQUEST,
  };
};

export const updateCartToServerFailure = () => {
  return {
    type: actionTypes.UPDATE_CART_TO_SERVER_FAILURE,
  };
};

export const updateCartToServerFetch = (type, cart) => dispatch => {
  dispatch(updateCartToServerRequest());

  axios
    .put(baseUrl + '/customer/update-cart', cart, {
      params: {
        id: customerId2,
      },
    })
    .then(res => {
      if (type == 'new') {
        dispatch(addNewProductToCart(res.data.newCart));
        ToastAndroid.show('Product added to cart', ToastAndroid.SHORT);
      } else if (type == 'change') {
        dispatch(changeProductQuantityinCart(res.data.newCart));
        ToastAndroid.show(
          'Product quantity updated in cart',
          ToastAndroid.SHORT,
        );
      }
    })
    .catch(err => {
      dispatch(
        updateCartToServerFailure({
          message: err.response
            ? err.response.data.errMessage || 'Internal Server Error'
            : 'Internal Server Error',
        }),
      );
      ToastAndroid.show(
        "Sorry, prodct can't be added to cart, try again.",
        ToastAndroid.LONG,
      );
    });
};
