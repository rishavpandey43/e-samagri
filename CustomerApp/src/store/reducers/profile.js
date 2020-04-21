import * as actionTypes from '../actions/types/actionTypes';

const initialState = {
  isLoading: false,
  profile: null,
  successMessage: null,
  errMessage: null,
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PROFILE_DETAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.GET_PROFILE_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profile: action.profile,
        successMessage: action.message,
      };
    case actionTypes.GET_PROFILE_DETAIL_FAILURE:
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
