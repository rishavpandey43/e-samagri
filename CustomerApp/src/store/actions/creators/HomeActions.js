import axios from 'axios';
import * as actionTypes from '../types/actionTypes';

import {baseUrl} from '../../../utils/constant';

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
