import axios from 'axios';
import interceptors from '../../utils/interceptors';

let api = axios.create({
  baseURL: 'https://myphotobookapp.herokuapp.com/',
});

interceptors(api);

export default api;
