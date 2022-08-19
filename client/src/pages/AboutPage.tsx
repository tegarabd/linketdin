import React from "react";
import { Redirect } from "../tools/Redirect";

function AboutPage() {
  const shouldRedirect = true;

  return (
    <>
      AboutPage
      {shouldRedirect && <Redirect replace to="/feed" />}
    </>
  );
}

export default AboutPage;
