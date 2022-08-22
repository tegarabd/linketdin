import { useAuthentication } from "../providers/AuthenticationContextProvider";
import { Redirect } from "../tools/Redirect";

function AuthenticatedRoute({ children }: { children: JSX.Element }) {
  const authentication = useAuthentication();

  if (!authentication.isLoggedIn) {
    return <Redirect to="/auth/login" />;
  }

  return children;
}

export default AuthenticatedRoute;
