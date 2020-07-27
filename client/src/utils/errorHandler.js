import removeToken from './removeToken';
import { LOG_OUT } from './../services/store/actions/types';
import history from './../views/history';
/**
 * Util to handle all errors ||
 * Use Format : errorHandler(error, dispatch, TYPE_OF_REDUCER , customPayload); ||
 * TYPE_OF_REDUCER will be ERROR as made .
 */
export default (error, dispatch, type, customPayload) => {

  if (error.response) {
    if (error.response.status === 500) {
      dispatch({
        type: type,
        payload: '500 Server Error',
      });
    } else if (error.response.status === 401) {
      removeToken('jwt');
      dispatch({ type: LOG_OUT });
      history.push('/login');
      dispatch({
        type: type,
        payload: '401 Unauthorized || Session Expired',
      });
    } else {
      dispatch({
        type: type,
        payload:
          customPayload ||
          error.response.data.error.message ||
          error.response.data.error,
      });
    }
  } else {
    dispatch({
      type: type,
      payload: 'Error 😨',
    });
  }
};
