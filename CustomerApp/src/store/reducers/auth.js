import {getDataFromAsync} from '../../utils/helper';
import * as actionTypes from '../actions/types/actionTypes';

const initialState = {
  isAuthenticated: false,
  authToken: null,
  fcmToken: null,
  isLoading: false,
  errMessage: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TOKEN:
      return {
        ...state,
        isAuthenticated: true,
        authToken: action.token,
      };
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        authToken: action.token,
        errMessage: null,
      };
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        errMessage: action.errMessage,
      };
    default:
      return {
        ...state,
      };
  }
};

export default auth;
