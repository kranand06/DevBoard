import { Navigate, Outlet } from 'react-router-dom';

export default function RestrictedRoute() {
  const token = localStorage.getItem("token");

  if (token) {
    // console.log("User is authenticated, redirecting to dashboard.");
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
