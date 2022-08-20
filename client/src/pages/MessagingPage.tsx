import React from "react";
import { Route, Routes } from "react-router-dom";

function MessagingPage() {
  return (
    <>
      <h1>MessageingPage</h1>
      <Routes>
        <Route path="/" element={<h1>No selected thread</h1>} />
        <Route path="/thread/:threadId" element={<h1>Selected thread</h1>} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  );
}

export default MessagingPage;
