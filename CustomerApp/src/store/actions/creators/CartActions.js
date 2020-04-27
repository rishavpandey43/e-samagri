import {ToastAndroid} from 'react-native';

import * as actionTypes from '../types/actionTypes';

export const addNewProductToCart = ({storeId, products}) => {
  return {
    type: actionTypes.ADD_NEW_PRODUCT_TO_CART,
    storeId,
    products,
  };
};

export const incrementSameProductToCart = ({storeId, products}) => {
  return {
    type: actionTypes.INCREMENT_SAME_PRODUCT_TO_CART,
    storeId,
    products,
  };
};

export const changeProductQuantityinCart = ({storeId, products}) => {
  return {
    type: actionTypes.CHANGE_PRODUCT_QUANTITY_IN_CART,
    storeId,
    products,
  };
};

export const updateCartToServerRequest = () => {
  return {};
};

export const updateCartToServerSuccess = () => {
  return {};
};

export const updateCartToServerFailure = () => {
  return {};
};
