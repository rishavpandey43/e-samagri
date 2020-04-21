import * as actionTypes from '../actions/types/actionTypes';

const initialState = {
  isLoading: false,
  profile: null,
  successMessage: null,
  errMessage: null,
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SELLER_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
        profile: null,
        successMessage: null,
        errMessage: null,
      };
    case actionTypes.GET_SELLER_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profile: action.profile,
        successMessage: action.message,
        errMessage: '',
      };
    case actionTypes.GET_SELLER_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        profile: null,
        errMessage: action.message,
      };
    default:
      return {
        ...state,
      };
  }
};

export default profile;
