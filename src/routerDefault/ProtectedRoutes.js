import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  let auth = localStorage.getItem("user");
  // console.log(auth);

  if (auth != null) {
    return <Outlet />;
  } else {
    return <Navigate to="/auth/login" />;
  }
};

export default ProtectedRoutes;
