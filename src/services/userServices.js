import { api } from './api';
import * as SecureStore from 'expo-secure-store';

export const login = async (username, password) => {
  try {
    const res = await api.post('/user/login', { username: username, password: password })

    await SecureStore.setItemAsync('accessToken', res.data.accessToken);
    await SecureStore.setItemAsync('refreshToken', res.data.refreshToken);
  } catch (err) {
    console.error('Login error:', err)
    throw err;
  }
}

// export const createUser = async (username, password) => {