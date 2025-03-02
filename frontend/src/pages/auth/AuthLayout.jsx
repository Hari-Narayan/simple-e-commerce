import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";

const AuthLayout = () => {
  const location = useLocation();
  const { user, lastURL = "/" } = useSelector((state) => state.auth);

  // Redirect to login page if not logged in
  if (user && location.pathname.includes("auth"))
    return <Navigate to="/" replace />;

  return (
    <div className="py-10">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
