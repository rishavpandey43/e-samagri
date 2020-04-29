import axios from 'axios';
import {ToastAndroid} from 'react-native';
import * as actionTypes from '../types/actionTypes';

import * as helper from '../../../utils/helper';
import {baseUrl} from '../../../utils/constant';

const customerId1 = '5ea249c95c80eb0b619658f7';
const customerId2 = '5ea249dc5c80eb0b619658f8';
const customerId3 = '5ea249e75c80eb0b619658f9';

export const getSellersRequest = () => {
  return {
    type: actionTypes.GET_SELLERS_REQUEST,
  };
};

export const getSellersSuccess = response => {
  return {
    type: actionTypes.GET_SELLERS_SUCCESS,
    sellers: response.sellers,
  };
};

export const getSellersFailure = response => {
  return {
    type: actionTypes.GET_SELLERS_FAILURE,
    message: response.message,
  };
};

export const getSellersFetch = token => dispatch => {
  dispatch(getSellersRequest());
  axios
    .get(baseUrl + '/customer/get-all-sellers', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      dispatch(getSellersSuccess({sellers: [...res.data.sellers]}));
    })
    .catch(err => {
      dispatch(
        getSellersFailure({
          message: err.response
            ? err.response.data.errMessage || 'Internal Server Error'
            : 'Internal Server Error',
        }),
      );
    });
};
