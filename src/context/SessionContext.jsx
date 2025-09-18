import { createContext, useState, useContext, useEffect } from 'react';
import api from '@/utils/api';

const SessionContext = createContext();

const useSession = () => useContext(SessionContext);

const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    refreshSession();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setAccessToken(data.result.access_token);
      setUser(data.result.user);
      return true;
    } catch (error) {
      setUser(null);
      setAccessToken(null);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
      setUser(null);
      setAccessToken(null);
      return true;
    } catch (error) {
      throw error;
    }
  };

  const refreshSession = async () => {
    try {
      const { data } = await api.post('/auth/refresh');
      setAccessToken(data.result.access_token);
      setUser(data.result.user);
      return true;
    } catch (error) {
      setUser(null);
      setAccessToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const isLoggedIn = !!user;

  const contextValue = {
    user,
    accessToken,
    isLoading,
    isLoggedIn,
    login,
    logout,
  };

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionProvider, useSession };
