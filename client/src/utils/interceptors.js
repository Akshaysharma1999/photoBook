import getToken from './getToken';

export default function (api) {
  api.interceptors.request.use(
    (request) => {
      // console.log("Bearer"+JSON.parse(getToken()));
      if (getToken() !== '' && getToken()!== null && getToken!== undefined) {       
        request.headers.Authorization = "Bearer"+JSON.parse(getToken())
      }
      // console.log(request.headers)
      return request;
    },
    (error) => {
      console.log('err');
    },
  );
}