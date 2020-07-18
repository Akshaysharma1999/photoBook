import history from '../../../views/history';
import {
  LOG_IN,
  ERROR,
  SUCCESS,
  ALLPOSTS,
  MYALLPOSTS,
  USERPROFILE,
} from './types';
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
 * action to make api request for image upload to cloud and then create post
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

/**
 * action to get all public posts
 */
export const getAllPosts = formValues => {
  return (dispatch, getState) => {
    api
      .get('/allposts')
      .then(response => {
        dispatch({ type: ALLPOSTS, payload: response.data });
      })
      .catch(error => {
        errorHandler(error, dispatch, ERROR);
      });
  };
};

/**
 * action to get all posts by user
 */
export const getMyAllPosts = formValues => {
  return (dispatch, getState) => {
    api
      .get('/myallposts')
      .then(response => {
        // console.log(response)
        dispatch({ type: MYALLPOSTS, payload: response.data });
      })
      .catch(error => {
        errorHandler(error, dispatch, ERROR);
      });
  };
};

/**
 * action to like a post
 */
export const likePost = postId => {
  return (dispatch, getState) => {
    api
      .put('/like', { postId: postId })
      .then(response => {
        let newArr = getState().posts.allposts.map(post => {
          if (post._id === response.data._id) {
            return response.data;
          } else {
            return post;
          }
        });
        dispatch({ type: ALLPOSTS, payload: { posts: newArr } });
      })
      .catch(error => {
        console.log(error);
        errorHandler(error, dispatch, ERROR);
      });
  };
};

/**
 * action to unlike a post
 */
export const unLikePost = postId => {
  return (dispatch, getState) => {
    api
      .put('/unlike', { postId: postId })
      .then(response => {
        let newArr = getState().posts.allposts.map(post => {
          if (post._id === response.data._id) {
            return response.data;
          } else {
            return post;
          }
        });
        dispatch({ type: ALLPOSTS, payload: { posts: newArr } });
      })
      .catch(error => {
        console.log(error);
        errorHandler(error, dispatch, ERROR);
      });
  };
};

/**
 * action to make a comment
 */
export const makeComment = (postId, text) => {
  return (dispatch, getState) => {
    api
      .put('/comment', { text: text, postId: postId })
      .then(response => {
        // console.log(response);
        let newArr = getState().posts.allposts.map(post => {
          if (post._id === response.data._id) {
            return response.data;
          } else {
            return post;
          }
        });
        dispatch({ type: ALLPOSTS, payload: { posts: newArr } });
      })
      .catch(error => {
        console.log(error);
        errorHandler(error, dispatch, ERROR);
      });
  };
};

/**
 * action to delete a post
 */
export const deletePost = postId => {
  return (dispatch, getState) => {
    api
      .delete(`/deletepost/${postId}`)
      .then(response => {
        // console.log(response);
        let newArr = getState().posts.allposts.filter(post => {
          if (post._id !== postId) {
            return post;
          }
        });
        // console.log(newArr)
        dispatch({ type: ALLPOSTS, payload: { posts: newArr } });
        dispatch({ type: SUCCESS, payload: response.data.message });
      })
      .catch(error => {
        console.log(error);
        errorHandler(error, dispatch, ERROR);
      });
  };
};

/**
 * action to get user profile
 */
export const getProfile = userId => {
  return (dispatch, getState) => {
    api
      .get(`/user/${userId}`)
      .then(response => {
        dispatch({ type: USERPROFILE, payload: response.data });
      })
      .catch(error => {
        console.log(error);
        errorHandler(error, dispatch, ERROR);
      });
  };
};
