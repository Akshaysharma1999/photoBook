import history from '../../../views/history';
import { LOG_IN, ERROR, SUCCESS } from './types';
import api from '../../api';
import imageToCloud from '../../api/imageToCloud';
import setToken from '../../../utils/setToken';
import logOutUtil from '../../../utils/logout';
import errorHandler from '../../../utils/errorHandler';
/**
 * login action is called when login form is submitted with formvalues
 */
export const logIn = formValues => {
  return (dispatch, getState) => {
    api
      .post('/signin', {
        email: formValues.email,
        password: formValues.password,
      })
      .then(response => {
        // console.log(response)
        setToken('jwt', JSON.stringify(response.data.token));
        dispatch({ type: LOG_IN, payload: response.data });
        history.push(`/profile`);
      })
      .catch(error => {
        errorHandler(error, dispatch, ERROR);
      });
  };
};

/**
 * signup action is called when signup form is submitted with formvalues
 */
export const signUp = formValues => {
  // console.log(formValues)
  return (dispatch, getState) => {
    api
      .post('/signup', {
        name: formValues.name,
        email: formValues.email,
        password: formValues.password,
      })
      .then(response => {
        history.push(`/login`);
      })
      .catch(error => {
        console.log(error);
        errorHandler(error, dispatch, ERROR);
      });
  };
};

/**
 * Action called to logout user
 */
export const logout = params => {
  return logOutUtil();
};

/**
 * action to make api request for image upload to cloud
 */

export const createPost = formValues => {
  return (dispatch, getState) => {
    imageToCloud
      .post('/image/upload', formValues.fileData)
      .then(response => {
        api
          .post('/createpost', {
            title: formValues.title,
            body: formValues.body,
            photo: response.data.url,
          })
          .then(res => {
            dispatch({ type: SUCCESS, payload: 'Posted Successfully' });
            history.push('/');
          })
          .catch(error => {
            errorHandler(error, dispatch, ERROR);
          });
      })
      .catch(error => {
        errorHandler(error, dispatch, ERROR);
      });
  };
};
