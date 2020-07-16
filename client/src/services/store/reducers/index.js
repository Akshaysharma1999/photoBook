import { combineReducers } from 'redux';
import userReducer from './userReducer';
import posts from './posts';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  user: userReducer,
  form: formReducer,
  posts: posts,
});
