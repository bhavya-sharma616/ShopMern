import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

import { useAppSelector } from "../hooks/reduxHooks";

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { token } = useAppSelector(
    (state) => state.auth
  );

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;