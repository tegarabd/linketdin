import React, { createContext, useState } from "react";
import { User } from "../types/user";

interface AuthenticationContextType {
  user: User;
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
  
  const [user, setUser] = useState<User>(null!);

  return <div>{children}</div>;
}

export default AuthenticationProvider;
