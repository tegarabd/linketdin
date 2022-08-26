import React, { createContext, useContext, useEffect, useState } from "react";
import { useJwt } from "../hooks/useJwt";

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
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const login = (token: string) => {
    const { isValid } = useJwt(token);
    if (isValid) {
      localStorage.setItem(import.meta.env.VITE_TOKEN_KEY, token);
      setIsLoggedIn(true);
    }
  };

  const logout = () => {
    localStorage.setItem(import.meta.env.VITE_TOKEN_KEY, "");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const { isValid } = useJwt();
    setIsLoggedIn(isValid);
    return () => {};
  }, [isLoggedIn]);

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
