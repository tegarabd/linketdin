import React from "react";
import { Route, Routes } from "react-router-dom";

function MessagingPage() {
  return (
    <>
      <div>MessageingPage</div>
      <Routes>
        <Route path="/" element={<div>No selected thread</div>} />
        <Route path="/thread/:threadId" element={<div>Selected thread</div>} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </>
  );
}

export default MessagingPage;
