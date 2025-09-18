import axios from 'axios';
import { notifyError } from '@/utils/notification';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api',
  withCredentials: true,
});

api.interceptors.response.use(
  response => response,
  error => {
    notifyError(error);
    return Promise.reject(error);
  }
);

export default api;