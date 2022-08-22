import React from "react";
import Footer from "./Footer";

function Main({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}

export default Main;
