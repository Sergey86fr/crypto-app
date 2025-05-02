import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(() => {
    return localStorage.getItem('isAuth') === 'true';
  });

  const login = () => {
    localStorage.setItem('isAuth', 'true');
    setIsAuth(true);
  };

  const logout = () => {
    localStorage.removeItem('isAuth');
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);