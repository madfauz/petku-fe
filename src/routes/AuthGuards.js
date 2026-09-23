import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../features/userSlice";

export function AuthInitializer({ children }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(getCurrentUser()).finally(() => setChecked(true));
    } else {
      setChecked(true);
    }
  }, [dispatch, token]);

  if (!checked) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Memuat...
      </div>
    );
  }

  return children;
}

export function ProtectedRoute({ allowedRoles }) {
  const { token, user } = useSelector((state) => state.user);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export function GuestRoute() {
  const token = useSelector((state) => state.user.token);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
