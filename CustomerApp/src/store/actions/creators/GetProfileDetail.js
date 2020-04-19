import * as actionTypes from '../types/actionTypes';
import axios from 'axios';

import * as helper from '../../../utils/helper';

export const getProfileDetailRequest = () => {
  return {
    type: actionTypes.GET_PROFILE_DETAIL_REQUEST,
  };
};

export const getProfileDetailSuccess = response => {
  return {
    type: actionTypes.GET_PROFILE_DETAIL_SUCCESS,
    products: response.products,
    message: response.message,
  };
};

export const getProfileDetailFailure = response => {
  return {
    type: actionTypes.GET_PROFILE_DETAIL_FAILURE,
    message: response.message,
  };
};

export const getProfileDetailFetch = () => dispatch => {
  // dispatch(getProfileDetailRequest());
  // axios
  //   .get('http://192.168.43.240:3000/product')
  //   .then(response => {
  //     products = helper.filterProductBySeller(sellerId, response.data);
  //     setTimeout(() => {
  //       dispatch(getProfileDetailSuccess({products}));
  //     }, 1000);
  //   })
  //   .catch(error => {
  //     dispatch(
  //       getProfileDetailFailure({
  //         message:
  //           error.response ||
  //           "Connection to server couldn't be established, please try again",
  //       }),
  //     );
  //   });
};
