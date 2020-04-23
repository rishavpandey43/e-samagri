import axios from 'axios';
import {ToastAndroid} from 'react-native';
import * as actionTypes from '../types/actionTypes';

import * as helper from '../../../utils/helper';
import {baseUrl} from '../../../utils/constant';

const sellerId1 = '5e9fb135233b5b03d51de35b';
const sellerId2 = '5e9fb291df5cf41033ca39e0';
const sellerId3 = '5e9fb2a3df5cf41033ca39e1';

export const addNewProductRequest = () => {
  return {
    type: actionTypes.ADD_NEW_PRODUCT_FAILURE,
  };
};

export const addNewProductSuccess = response => {
  return {
    type: actionTypes.ADD_NEW_PRODUCT_SUCCESS,
    message: response.message,
  };
};

export const addNewProductFailure = response => {
  return {
    type: actionTypes.ADD_NEW_PRODUCT_FAILURE,
    message: response.message,
  };
};

export const addNewProductFetch = data => dispatch => {
  dispatch(addNewProductRequest());
};
