import * as actionTypes from '../actions/types/actionTypes';

const initialState = {
  fetchingProfile: false,
  profile: null,
  successMessage: null,
  errMessage: null,
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CUSTOMER_PROFILE_REQUEST:
      return {
        ...state,
        fetchingProfile: true,
      };
    case actionTypes.GET_CUSTOMER_PROFILE_SUCCESS:
      return {
        ...state,
        fetchingProfile: false,
        profile: action.profile,
        successMessage: action.message,
      };
    case actionTypes.GET_CUSTOMER_PROFILE_FAILURE:
      return {
        ...state,
        fetchingProfile: false,
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
