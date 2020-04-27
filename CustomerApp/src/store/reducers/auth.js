import * as actionTypes from '../actions/types/actionTypes';

const initialState = {
  isAuthenticated: false,
  authToken: null,
  fcmToken: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_PROFILE_FAILURE:
      return {
        ...state,
      };

    default:
      return {
        ...state,
      };
  }
};

export default auth;
