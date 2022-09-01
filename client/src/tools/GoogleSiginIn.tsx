import { useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import EntirePageLoading from "../components/utilities/entirePage/EntirePageLoading";
import { GOOGLE, IS_EMAIL_ALREADY_TAKEN } from "../graphql/authentication";
import { useJwt } from "../hooks/useJwt";
import { useAuthentication } from "../providers/AuthenticationContextProvider";
import { GoogleAuth } from "../types/authentication";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

interface CredentialResponse {
  credential: string;
}

function GoogleSiginIn() {
  const [googleAuth] = useMutation(GOOGLE);
  const [isEmailAlreadyTaken] = useMutation(IS_EMAIL_ALREADY_TAKEN);
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

    const email = await isEmailAlreadyTaken({
      variables: { email: data.email },
    });

    if (email.data.auth.isEmailAlreadyTaken) {
      const google = await googleAuth({ variables: { input: data } });
      authentication.login(google.data.auth.google.token);
    }
    navigate("/auth/register", { state: { data } });
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

  return <Wrapper id="googleSignInDiv"></Wrapper>;
}

export default GoogleSiginIn;
