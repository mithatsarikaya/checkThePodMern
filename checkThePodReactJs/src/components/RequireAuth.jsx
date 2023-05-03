import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RequireAuth() {
  const { user } = useAuth();
  const navigate = useNavigate();

  console.log(user);
  return <Outlet />;
}

// user ? <Outlet /> : <Navigate to="/login" />
