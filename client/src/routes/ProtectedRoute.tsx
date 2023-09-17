import { useAppSelector } from "../hooks/useReducer";
import { Navigate } from "react-router-dom";
import TMLayout from "../partials/TMLayout";

type Props = {};

function ProtectedRoute({ }: Props) {
  const auth = useAppSelector((state) => state.auth);

  // Check if user is logged in
  if (!auth.authenticated) return <Navigate to="/login" />;

  return <TMLayout />;
}

export default ProtectedRoute;
