import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
  baseURL: 'https://intellidriverapi.onrender.com/',
});

api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const token = await SecureStore.getItemAsync('refreshToken');
        const res = await axios({url: '/user/refresh', method: 'post', headers: { 'Authorization': `Bearer ${token}` }});

        await SecureStore.setItemAsync('accessToken', res.data.accessToken);

        originalRequest.headers['Authorization'] = `Bearer ${res.data.accessToken}`;
        return api(originalRequest);
      } catch (err) {
        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('refreshToken');
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export { api };

