import { Navigate, useLocation } from "react-router";
import { useFirebaseUser } from "../hooks/useFirebaseUser";

type Props = {
  adminAccess?: boolean;
  children?: React.ReactNode;
};
export const PrivateRoute = ({ adminAccess, children }: Props) => {
  const location = useLocation();
  const { isAdmin, userLoading } = useFirebaseUser();

  return userLoading ? (
    <div>Loading...</div>
  ) : adminAccess && isAdmin ? (
    <>{children}</>
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};
