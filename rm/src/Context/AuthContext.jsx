import React, { createContext, useContext, useState } from 'react';
import { useFrappeAuth } from 'frappe-react-sdk';
import { useEffect } from 'react';
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const { currentUser, login, logout } = useFrappeAuth();
  const [authUser, setAuthUser] = useState(currentUser);

  useEffect(() => {
    setAuthUser(currentUser);
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ authUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
