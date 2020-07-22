import history from '../../../views/history';
import {
  ERROR,
  MYFEED,
  LOG_IN,
  UPDATEPIC,
  SUCCESS,
  ALLPOSTS,
  MYALLPOSTS,
  FOLLOWUSER,
  USERPROFILE,
  UNFOLLOWUSER,
  FOLLOWUSERPROFILE,
  UNFOLLOWUSERPROFILE,
} from './types';
import api from '../../api';
import imageToCloud from '../../api/imageToCloud';
import setToken from '../../../utils/setToken';
import logOutUtil from '../../../utils/logout';
import errorHandler from '../../../utils/errorHandler';
import { formValues } from 'redux-form';
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
function signUpHelper(formValues, dispatch, response) {
  api
    .post('/signup', {
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
      profileImage: response,
    })
    .then(response => {
      dispatch({ type: SUCCESS, payload: response.data.message });
      history.push(`/login`);
    })
    .catch(error => {
      console.log(error);
      errorHandler(error, dispatch, ERROR);
    });
}
export const signUp = formValues => {
  // console.log(formValues)
  return (dispatch, getState) => {
    if (formValues.fileData !== null) {
      imageToCloud
        .post('/image/upload', formValues.fileData)
        .then(response => {
          signUpHelper(formValues, dispatch, response.data.url);
        })
        .catch(error => {
          errorHandler(error, dispatch, ERROR, 'Upload Image 😬');
        });
    } else {
      signUpHelper(
        formValues,
        dispatch,
        'https://res.cloudinary.com/dt9bv7wo6/image/upload/v1595159880/vippng.com-person-icon-png-transparent-4125354_ymyevc.png',
      );
    }
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
        errorHandler(error, dispatch, ERROR, 'Upload Image 😬');
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

/**
 * action to follow a user
 */
export const followUser = followId => {
  return (dispatch, getState) => {
    api
      .put('/follow', { followId: followId })
      .then(response => {
        // console.log(response)
        let st = getState();
        let obj = {
          ...st.user.user_data,
          following: response.data.from.following,
        };
        let obj1 = {
          ...st.userProfile.user,
          followers: response.data.to.followers,
        };

        dispatch({ type: FOLLOWUSER, payload: obj });
        dispatch({
          type: FOLLOWUSERPROFILE,
          payload: obj1,
        });
        dispatch({ type: SUCCESS, payload: 'Successfully Followed' });
      })
      .catch(error => {
        console.log(error);
        errorHandler(error, dispatch, ERROR);
      });
  };
};

/**
 * action to unfollow a user
 */
export const unFollowUser = unFollowId => {
  return (dispatch, getState) => {
    api
      .put('/unfollow', { unFollowId: unFollowId })
      .then(response => {
        // console.log(response)
        let st = getState();
        let obj = {
          ...st.user.user_data,
          following: response.data.from.following,
        };
        let obj1 = {
          ...st.userProfile.user,
          followers: response.data.to.followers,
        };
        dispatch({ type: UNFOLLOWUSER, payload: obj });
        dispatch({
          type: UNFOLLOWUSERPROFILE,
          payload: obj1,
        });
        dispatch({ type: SUCCESS, payload: 'Successfully UnFollwed' });
      })
      .catch(error => {
        console.log(error);
        errorHandler(error, dispatch, ERROR);
      });
  };
};

/**
 * action to get posts of people i follow
 */
export const getMyFeed = () => {
  return (dispatch, getState) => {
    api
      .get('/getsubposts')
      .then(response => {
        dispatch({ type: MYFEED, payload: response.data });
      })
      .catch(error => {
        errorHandler(error, dispatch, ERROR);
      });
  };
};

/**
 * action to update profile image
 */
export const updateProfileImage = formValues => {
  return (dispatch, getState) => {
    imageToCloud
      .post('/image/upload', formValues.fileData)
      .then(response => {
        api
          .put('/updatepic', { profileImage: response.data.url })
          .then(response => {
            // console.log(response);
            let st = getState().user.user_data;
            st.profileImage = response.data.profileImage;
            dispatch({ type: UPDATEPIC, payload: st });
            dispatch({ type: SUCCESS, payload: 'Profile Pic Updated' });
          })
          .catch(error => {
            errorHandler(error, dispatch, ERROR);
          });
      })
      .catch(error => {
        console.log(error);
        errorHandler(error, dispatch, ERROR, 'Upload Image 😬');
      });
  };
};

/**
 * Send Reset Pass Link
 */

export const sendResetPassLink = formValues => {
  return (dispatch, getState) => {
    api
      .post('/resetMailLink', {
        mailTo: formValues.email,
      })
      .then(response => {
        console.log(response);
        dispatch({ type: SUCCESS, payload: response.data.message });
      })
      .catch(error => {
        errorHandler(error, dispatch, ERROR);
      });
  };
};

/**
 * Reset Password
 */
export const resetPassword = formValues => {
  return (dispatch, getState) => {
    api
      .post('/newPass', {
        password: formValues.password,
        token: formValues.token,
      })
      .then(response => {
        // console.log(response);
        dispatch({ type: SUCCESS, payload: response.data.message });
        history.push('/login');
      })
      .catch(error => {
        errorHandler(error, dispatch, ERROR);
      });
  };
};
