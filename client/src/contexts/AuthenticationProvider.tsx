import React, { createContext, useState } from "react";

interface AuthenticationContextType {
  userId: string;
  userActivationId: string;
  userForgotPasswordId: string;
  login: (email: string, password: string, callback: VoidFunction) => void;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    callback: VoidFunction
  ) => void;
  activate: (
    activationId: string,
    code: string,
    callback: VoidFunction
  ) => void;
  verifyForgotPasswordEmail: (email: string, callback: VoidFunction) => void;
  verifyForgotPasswordCode: (
    forgotPasswordId: string,
    code: string,
    callback: VoidFunction
  ) => void;
  resetPassword: (
    password: string,
    confirmPassword: string,
    callback: VoidFunction
  ) => void;
}

const AuthenticationContext = createContext<AuthenticationContextType>(null!);

function AuthenticationProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string>(null!);
  const [userActivationId, setUserActivationId] = useState<string>(null!);
  const [userForgotPasswordId, setUserForgotPasswordId] = useState<string>(
    null!
  );

  const login = (email: string, password: string, callback: VoidFunction) => {};
  const register = (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    callback: VoidFunction
  ) => {};
  const activate = (
    activationId: string,
    code: string,
    callback: VoidFunction
  ) => {};
  const verifyForgotPasswordEmail = (
    email: string,
    callback: VoidFunction
  ) => {};
  const verifyForgotPasswordCode = (
    forgotPasswordId: string,
    code: string,
    callback: VoidFunction
  ) => {};
  const resetPassword = (
    password: string,
    confirmPassword: string,
    callback: VoidFunction
  ) => {};

  const value = {
    userId,
    userActivationId,
    userForgotPasswordId,
    login,
    register,
    activate,
    verifyForgotPasswordEmail,
    verifyForgotPasswordCode,
    resetPassword,
  };

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export default AuthenticationProvider;
