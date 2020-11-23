import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://localhost:44300/api/',
});
export default instance;
