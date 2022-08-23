import { useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import EntirePageLoading from "../components/utilities/EntirePageLoading";
import { GOOGLE } from "../graphql/authentication";
import { useJwt } from "../hooks/useJwt";
import { useAuthentication } from "../providers/AuthenticationContextProvider";
import { GoogleAuth } from "../types/authentication";
import sign from "jwt-encode";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

interface CredentialResponse {
  credential: string;
}

function GoogleSiginIn() {
  const [googleAuth, { error, loading }] = useMutation(GOOGLE);
  const authentication = useAuthentication();
  const navigate = useNavigate();

  const handleCredentialResponse = async (response: CredentialResponse) => {
    const decoded = useJwt(response.credential);
    const data: GoogleAuth = {
      email: decoded.email,
      firstName: decoded.given_name,
      lastName: decoded.family_name,
      profilePhotoUrl: decoded.picture,
      userId: decoded.sub,
    };

    const {
      auth: {
        google: { token },
      },
    } = (await googleAuth({ variables: { input: data } })).data;

    if (!error) {
      authentication.login(token);
      navigate("/feed");
    }
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
      {
        theme: "outline",
        size: "large",
        shape: "pill",
        width: 336,
        logo_alignment: "center",
      }
    );

    return () => {};
  }, []);

  if (loading) {
    return <EntirePageLoading />;
  }
  return <Wrapper id="googleSignInDiv"></Wrapper>;
}

export default GoogleSiginIn;
