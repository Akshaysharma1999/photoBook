import {
  USERPROFILE,
  FOLLOWUSERPROFILE,
  UNFOLLOWUSERPROFILE,
} from '../actions/types';

const INITIAL_STATE = {
  posts: [],
  user: null,
};

export default (state = INITIAL_STATE, action) => {
  if (action.type === USERPROFILE) {
    return {
      ...state,
      posts: action.payload.posts,
      user: action.payload.user,
    };
  } else if (action.type === FOLLOWUSERPROFILE) {
    return {
      ...state,
      user: action.payload,
    };
  } else if (action.type === UNFOLLOWUSERPROFILE) {
    return {
      ...state,
      user: action.payload,
    };
  } else {
    return { ...state };
  }
};
