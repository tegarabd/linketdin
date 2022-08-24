import React from "react";
import { Route, Routes } from "react-router-dom";
import { Redirect } from "../../../tools/Redirect";
import NotFound from "../../error/NotFound";
import ResetPasswordPage from "./ResetPasswordPage";
import VerifyCodePage from "./VerifyCodePage";
import VerifyEmailPage from "./VerifyEmailPage";

function ForgotPasswordPage() {
  return (
    <Routes>
      <Route path="/" element={<Redirect to="verify_email" />} />
      <Route path="verify_email" element={<VerifyEmailPage />} />
      <Route path="verify_code" element={<VerifyCodePage />} />
      <Route path="reset_password" element={<ResetPasswordPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default ForgotPasswordPage;
