import React from "react";
import { Route, Routes } from "react-router-dom";
import { Redirect } from "../../tools/Redirect";
import NotFound from "../error/NotFound";
import ActivationId from "./activate/ActivationId";

function ActivationPage() {
  return (
    <Routes>
      <Route path="/" element={<Redirect to="/auth/login" />} />
      <Route path="/:activationId" element={<ActivationId />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default ActivationPage;
