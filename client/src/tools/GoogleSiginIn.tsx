import React, { useEffect } from "react";


function GoogleSiginIn() {
  const handleCredentialResponse = (response: unknown) => {
    console.log(response);
  };

  useEffect(() => {
    /* global google */
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });

    /* global google */
    // @ts-ignore
    google.accounts.id.renderButton(
      document.getElementById("googleSignInDiv"),
      { theme: "outline", size: "large" }
    );

    return () => {};
  }, []);

  return <div id="googleSignInDiv"></div>;
}

export default GoogleSiginIn;
