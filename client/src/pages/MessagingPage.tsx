import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "./error/NotFound";

function MessagingPage() {
  return (
    <>
      <div>MessageingPage</div>
      <Routes>
        <Route path="/" element={<div>No selected thread</div>} />
        <Route path="/thread/:threadId" element={<div>Selected thread</div>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default MessagingPage;
