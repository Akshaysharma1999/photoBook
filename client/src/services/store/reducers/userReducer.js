import {
  ERROR,
  SUCCESS,
  LOG_IN,
  LOG_OUT,
  MYALLPOSTS,
  FOLLOWUSER,
  UNFOLLOWUSER,
  MYFEED,
  UPDATEPIC,
} from '../actions/types';

const INITIAL_STATE = {
  errors: [],
  success: [],
  user_data: null,
  isLogedIn: false,
  myAllPosts: [],
  myFeed: [],
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
      myFeed: [],
    };
  } else if (action.type === MYALLPOSTS) {
    return { ...state, myAllPosts: action.payload.posts };
  } else if (action.type === FOLLOWUSER) {
    return {
      ...state,
      user_data: action.payload,
    };
  } else if (action.type === UNFOLLOWUSER) {
    return {
      ...state,
      user_data: action.payload,
    };
  } else if (action.type === MYFEED) {
    return { ...state, myFeed: action.payload.posts };
  } else if (action.type === UPDATEPIC) {
    return { ...state, user_data: action.payload };
  } else {
    return { ...state };
  }
};
