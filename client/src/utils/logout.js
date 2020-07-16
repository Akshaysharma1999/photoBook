import removeToken from './removeToken';
import history from '../views/history';
import { LOG_OUT} from '../services/store/actions/types';

export default () => {
  return async (dispatch, getState) => {
    await removeToken('jwt');
    dispatch({ type: LOG_OUT }); 
    history.push('/login');
  };
};
