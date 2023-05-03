import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RequireAuth() {
  const { auth } = useAuth();

  return auth.username ? <Outlet /> : <Navigate to="/login" />;
}
