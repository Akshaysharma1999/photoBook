import { ERROR, SUCCESS, LOG_IN, LOG_OUT, MYALLPOSTS } from '../actions/types';

const INITIAL_STATE = {
  errors: [],
  success: [],
  user_data: null,
  isLogedIn: false,
  myAllPosts: [],
};

export default (state = INITIAL_STATE, action) => {
  if (action.type === ERROR) {
    return { ...state, errors: [action.payload], success: [] };
  } else if (action.type === SUCCESS) {
    return {
      ...state,
      success: [action.payload],
      errors: [],
    };
  } else if (action.type === LOG_IN) {
    return {
      ...state,
      user_data: action.payload,
      errors: [],
      success: [action.payload.message],
      isLogedIn: true,
    };
  } else if (action.type === LOG_OUT) {
    return {
      ...state,
      errors: [],
      success: [],
      user_data: null,
      isLogedIn: false,
      myAllPosts: [],
    };
  } else if (action.type === MYALLPOSTS) {
    return { ...state, myAllPosts: action.payload.posts };
  } else {
    return { ...state };
  }
};
