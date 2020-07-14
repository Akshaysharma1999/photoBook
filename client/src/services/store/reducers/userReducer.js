import {} from '../actions/types';

const INITIAL_STATE = {
  errors: [],
  success: [],
};

export default (state = INITIAL_STATE, action) => {
  return { ...state };
};
