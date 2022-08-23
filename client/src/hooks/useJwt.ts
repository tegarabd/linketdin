import jwtDecode from "jwt-decode";

interface DecodedJwt {
  userId: string;
  exp: number;
  iat: number;
}

export const useJwt = (
  token?: string
): {
  userId: string;
  isExpired: boolean;
  isValid: boolean;
} => {
  let tkn;

  if (typeof token == "undefined") {
    tkn = localStorage.getItem(import.meta.env.VITE_TOKEN_KEY);
  } else {
    tkn = token;
  }

  if (tkn == null || tkn == "") {
    return { userId: "", isExpired: true, isValid: false };
  }

  const decoded = jwtDecode(tkn);
  const { userId, exp } = <DecodedJwt>decoded;

  const isExpired = exp < getTimestampInSeconds();
  const isValid = !isExpired && userId != null;

  return { userId, isExpired, isValid };
};

function getTimestampInSeconds() {
  return Math.floor(Date.now() / 1000);
}
