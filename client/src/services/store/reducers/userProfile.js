import { USERPROFILE } from '../actions/types';

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
  } else {
    return { ...state };
  }
};
