import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Redirect } from "../../../tools/Redirect";
import NotFound from "../../error/NotFound";
import ResetPasswordPage from "./ResetPasswordPage";
import VerifyCodePage from "./VerifyCodePage";
import VerifyEmailPage from "./VerifyEmailPage";

function ForgotPasswordPage() {
  const [isValidCode, setIsValidCode] = useState(false);
  const [userId, setUserId] = useState("");

  return (
    <Routes>
      <Route path="/" element={<Redirect to="verify_email" />} />
      <Route path="verify_email" element={<VerifyEmailPage />} />
      <Route
        path="verify_code/:forgotPasswordId"
        element={
          <VerifyCodePage
            setIsValidCode={setIsValidCode}
            setUserId={setUserId}
          />
        }
      />
      <Route
        path="reset_password"
        element={
          <ResetPasswordPage isValidCode={isValidCode} userId={userId} />
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default ForgotPasswordPage;
