import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('user');
  const [token, setToken] = useState('');

  const login = (name, userRole = 'user') => {
    setIsLoggedIn(true);
    setUserName(name);
    setRole(userRole);
    setToken(`token_${Date.now()}`);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setRole('user');
    setToken('');
  };

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      userName,
      role,
      token,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};