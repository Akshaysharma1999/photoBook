import axios from 'axios';

let imageToCloud = axios.create({
  baseURL: 'https://api.cloudinary.com/v1_1/dt9bv7wo6',
});

export default imageToCloud;
