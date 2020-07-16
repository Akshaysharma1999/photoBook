import axios from 'axios';
import interceptors from '../../utils/interceptors';

let api = axios.create({
  baseURL: 'http://localhost:5000/',
});

interceptors(api);

export default api;
