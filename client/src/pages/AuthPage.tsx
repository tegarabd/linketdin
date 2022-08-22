import React from "react";
import { Route, Routes } from "react-router-dom";
import { Redirect } from "../tools/Redirect";
import ActivationPage from "./ActivationPage";
import ForgotPasswordPage from "./ForgotPasswordPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

function AuthPage() {
  return (
    <Routes>
      <Route path="/" element={<Redirect to="register" />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="activate/*" element={<ActivationPage />} />
      <Route path="forgot_password/*" element={<ForgotPasswordPage />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}

export default AuthPage;
