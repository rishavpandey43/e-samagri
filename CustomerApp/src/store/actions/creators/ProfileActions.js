import axios from 'axios';
import {ToastAndroid} from 'react-native';
import * as actionTypes from '../types/actionTypes';

import * as helper from '../../../utils/helper';
import {baseUrl} from '../../../utils/constant';

const sellerId1 = '5e9fb135233b5b03d51de35b';
const sellerId2 = '5e9fb291df5cf41033ca39e0';
const sellerId3 = '5e9fb2a3df5cf41033ca39e1';

const customerId1 = '5ea249c95c80eb0b619658f7';
const customerId2 = '5ea249dc5c80eb0b619658f8';
const customerId3 = '5ea249e75c80eb0b619658f9';

export const getProfileRequest = () => {
  return {
    type: actionTypes.GET_CUSTOMER_PROFILE_REQUEST,
  };
};

export const getProfileSuccess = response => {
  return {
    type: actionTypes.GET_CUSTOMER_PROFILE_SUCCESS,
    profile: response.profile,
    message: response.message,
  };
};

export const getProfileFailure = response => {
  return {
    type: actionTypes.GET_CUSTOMER_PROFILE_FAILURE,
    message: response.message,
  };
};

export const getProfileFetch = () => dispatch => {
  dispatch(getProfileRequest());
  axios
    .get(baseUrl + '/customer/get-customer', {
      params: {
        id: customerId1,
      },
    })
    .then(res => {
      dispatch(getProfileSuccess({profile: {...res.data.customer}}));
    })
    .catch(err => {
      dispatch(
        getProfileFailure({
          message: err.response
            ? err.response.data.errMessage || 'Internal Server Error'
            : 'Internal Server Error',
        }),
      );
    });
};
