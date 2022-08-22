import React from "react";
import { useAuthentication } from "../providers/AuthenticationContextProvider";
import { Redirect } from "../tools/Redirect";

function AboutPage() {
  const authentication = useAuthentication();
  if (authentication.isLoggedIn) {
    return <Redirect to="/feed" />;
  }
  return <div>AboutPage</div>;
}

export default AboutPage;
