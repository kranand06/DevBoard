import { Navigate, Outlet } from 'react-router-dom';

export default function RestrictedRoute() {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
