import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Outlet, Navigate, useNavigate, useLocation } from "react-router-dom";
import getUserDetail from "../redux/actions/getUserDetail";

const ProtectedRoutes = (props) => {
  const user = sessionStorage.getItem("user");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    props.getUserDetail();
  }, []);

  // if (props.loginStatus === true) {
  //   return <Outlet />;
  // } else {
  //   return <Navigate to="/auth/login" />;
  // }

  return props.dataUser ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

const mapStateToProps = (state) => {
  return {
    loginStatus: state.userReducer.isLoggedIn,
    dataUser: state.userReducer.dataUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserDetail: () => dispatch(getUserDetail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoutes);
