import getToken from './getToken';

export default function(api) {
  api.interceptors.request.use(
    request => {
      if (getToken() !== '' && getToken() !== null && getToken !== undefined) {
        request.headers.Authorization = 'Bearer' + JSON.parse(getToken());
      }
      return request;
    },
    error => {
      console.log('err');
    },
  );
}
