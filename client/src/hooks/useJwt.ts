import jwtDecode from "jwt-decode";

interface DecodedJwt {
  exp: number;
  iat: number;
  iss: string;
  nbf: number;
  aud: string;
  sub: string;
  hd: string;
  email: string;
  email_verified: boolean;
  azp: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  jti: string;
  isValid: boolean;
}

export const useJwt = (token?: string): DecodedJwt => {
  let tkn;

  if (typeof token == "undefined") {
    tkn = localStorage.getItem(import.meta.env.VITE_TOKEN_KEY);
  } else {
    tkn = token;
  }

  if (tkn == null || tkn == "") {
    return <DecodedJwt>{ isValid: false };
  }

  const decoded = jwtDecode(tkn);
  const { sub, email, given_name, family_name, picture, exp } = <DecodedJwt>(
    decoded
  );

  const isExpired = exp < getTimestampInSeconds();
  const isValid = !isExpired && sub != null;

  return <DecodedJwt>{ sub, email, given_name, family_name, picture, isValid };
};

function getTimestampInSeconds() {
  return Math.floor(Date.now() / 1000);
}