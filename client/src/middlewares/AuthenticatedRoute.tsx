import { Navigate, useLocation } from "react-router-dom";

function AuthenticatedRoute({ children }: { children: JSX.Element }) {
  const location = useLocation();

  if (location) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default AuthenticatedRoute;
