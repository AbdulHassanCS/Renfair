import {
  DO_LOGIN,
  DO_LOGOUT,
  DO_SIGNUP,
  GET_ALL_MATCHES,
  GET_USER_DETAILS,
  GET_REVIEWS,
} from "../types/types";
const initialState = {
  login_details: null,
  logout: null,
  signup_details: null,
  get_user_details: null,
  get_reviews: null,
};
const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case DO_LOGIN:
      return {
        ...state,
        login_details: action.payload,
      };
    case DO_LOGOUT:
      return {
        ...state,
        logout: action.payload,
      };
    case DO_SIGNUP:
      return {
        ...state,
        signup_details: action.payload,
      };
    case GET_USER_DETAILS:
      return {
        ...state,
        get_user_details: action.payload,
      };
    case GET_REVIEWS:
      return {
        ...state,
        get_reviews: action.payload,
      };

    default:
      return state;
  }
};
export default mainReducer;
