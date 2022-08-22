import React, { createContext, useContext, useState } from "react";

interface AuthenticationContextType {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthenticationContext = createContext<AuthenticationContextType>(null!);

function AuthenticationContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = localStorage.getItem(import.meta.env.VITE_TOKEN_KEY);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!token);

  const login = (token: string) => {
    localStorage.setItem(import.meta.env.VITE_TOKEN_KEY, token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.setItem(import.meta.env.VITE_TOKEN_KEY, "");
    setIsLoggedIn(false);
  };

  const value = {
    isLoggedIn,
    login,
    logout,
  };

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export default AuthenticationContextProvider;

export function useAuthentication() {
  return useContext(AuthenticationContext);
}
