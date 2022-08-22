import { useAuthentication } from "../providers/AuthenticationContextProvider";
import { Redirect } from "../tools/Redirect";

function GuestRoute({ children }: { children: JSX.Element }) {
  const authentication = useAuthentication();

  if (authentication.isLoggedIn) {
    return <Redirect to="/" />;
  }

  return children;
}

export default GuestRoute;
