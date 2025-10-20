import { createContext, useEffect, useState } from 'react' 
import * as SecureStore from 'expo-secure-store';


// eslint-disable-next-line react-refresh/only-export-components
export const userContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  const updateCurrentUser = (user) => {
    try {
      setCurrentUser(user);
      SecureStore.setItemAsync('username', user.username);
    } catch (err) {
      console.error("erro:", err)
      throw err
    }
  }

  const logout = async () => {
    setCurrentUser({});
    await SecureStore.deleteItemAsync('username');
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
  }

  return (
    <userContext.Provider value={{ currentUser, updateCurrentUser, logout }}>
      {children}
    </userContext.Provider>
  );
}