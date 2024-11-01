import axios from 'axios';
import {BASE_URL} from '@env';

const backend = axios.create({
  baseURL: BASE_URL,
});

// export const setAxiosToken = (token) => {
//   backend.defaults.headers.common['Authorization'] = `Token ${token}`;
// }

// localStorage.load({key: 'token'}).then((token) => {
//   setAxiosToken(token);
// }).catch(() => {
//   setAxiosToken("");
// });

export default backend;
