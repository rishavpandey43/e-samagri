import * as actionTypes from '../types/actionTypes';
import axios from 'axios';

import * as helper from '../../../utils/helper';
import {baseUrl} from '../../../utils/constant';

export const getProfileRequest = () => {
  return {
    type: actionTypes.GET_SELLER_PROFILE_REQUEST,
  };
};

export const getProfileSuccess = response => {
  return {
    type: actionTypes.GET_SELLER_PROFILE_SUCCESS,
    profile: response.profile,
    message: response.message,
  };
};

export const getProfileFailure = response => {
  return {
    type: actionTypes.GET_SELLER_PROFILE_FAILURE,
    message: response.message,
  };
};

export const getProfileFetch = () => dispatch => {
  const sellerId1 = '5e9e6a75afbc1229e5a64c6a';
  const sellerId2 = '5e9e6a9dafbc1229e5a64c6b';
  const sellerId3 = '5e9e6aa8afbc1229e5a64c6c';
  dispatch(getProfileRequest());
  axios
    .get(baseUrl + '/seller/get-seller', {
      params: {
        id: sellerId1,
      },
    })
    .then(res => {
      dispatch(getProfileSuccess({profile: {...res.data.seller}}));
    })
    .catch(err => {
      dispatch(
        getProfileFailure({
          message: err.response.data.errMessage || 'Internal Server Error',
        }),
      );
    });
};
