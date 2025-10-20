import { createContext, useEffect, useState } from 'react' 
import * as SecureStore from 'expo-secure-store';


// eslint-disable-next-line react-refresh/only-export-components
export const userContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  const updateCurrentUser = (user) => {
    setCurrentUser(user);
    SecureStore.setItemAsync('username', JSON.stringify(user.username));
  }

  const logout = async () => {
    setCurrentUser({});
    await SecureStore.deleteItemAsync('usernamme');
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
  }

  return (
    <appContext.Provider value={{ currentUser, updateCurrentUser, logout }}>
      {children}
    </appContext.Provider>
  );
}