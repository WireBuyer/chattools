import React, { createContext, useState, useEffect, useContext } from 'react';

// @ts-ignore
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/me');
      if (response.ok) {
        const userData = await response.json();
        setIsLoggedIn(true);
        setUser(userData);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.error('error: ', error);
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const getXsrfToken = () => {
    const cookie = document.cookie.split("; ")
    .find((row) => row.startsWith("XSRF-TOKEN="))?.split("=")[1];

    return cookie;
  };

  const logout = async () => {
    try {
      const response = await fetch('/api/logout',
        {
          method: "POST",
          credentials: "include",
          headers: {
            "X-XSRF-TOKEN": getXsrfToken(),
          }
        }
      );
      if (response.ok) {
        setIsLoggedIn(false);
        setUser(null);
      } else {
        console.log("Could not log out")
      }
    } catch (error) {
      console.error('error: ', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, checkAuthStatus, logout, getXsrfToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);