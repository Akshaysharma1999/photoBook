import { ALLPOSTS } from '../actions/types';

const INITIAL_STATE = {
  allposts: [],
};

export default (state = INITIAL_STATE, action) => {
  if (action.type === ALLPOSTS) {
    return {
      ...state,
      allposts: action.payload.posts,
    };
  }else {
    return { ...state };
  }
};
