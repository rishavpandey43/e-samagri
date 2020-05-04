import axios from 'axios';
import {ToastAndroid} from 'react-native';
import * as actionTypes from '../types/actionTypes';

import * as helper from '../../../utils/helper';
import {baseUrl} from '../../../utils/constant';

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

export const getCartDetailFetch = token => dispatch => {
  dispatch(getCartDetailRequest());
  axios
    .get(baseUrl + '/customer/get-cart', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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

export const updateCartToServerSuccess = () => {
  return {
    type: actionTypes.UPDATE_CART_TO_SERVER_SUCCESS,
  };
};

export const updateCartToServerFailure = () => {
  return {
    type: actionTypes.UPDATE_CART_TO_SERVER_FAILURE,
  };
};

export const updateCartToServerFetch = (token, type, cart) => dispatch => {
  dispatch(updateCartToServerRequest());
  axios
    .put(baseUrl + '/customer/update-cart', cart, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      dispatch(updateCartToServerSuccess());
      if (type == 'new') {
        dispatch(addNewProductToCart(res.data.newCart));
        ToastAndroid.show('Product added to cart', ToastAndroid.SHORT);
      } else if (type == 'increment' || type == 'decrement') {
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
        "Sorry, product can't be added to cart, try again.",
        ToastAndroid.LONG,
      );
    });
};
