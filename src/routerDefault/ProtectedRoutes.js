import React, { useEffect, useCallback, useRef } from "react";
import { connect } from "react-redux";
import { Outlet, Navigate, useNavigate, useLocation } from "react-router-dom";
import getUserDetail from "../redux/actions/getUserDetail";
import axios from "axios";

const ProtectedRoutes = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const intervalRef = useRef();

  const user = JSON.parse(sessionStorage.getItem("user"));

  const refreshToken = useCallback((token) => {
    var configRefresh = {
      method: "get",
      url: "https://asix-store.herokuapp.com/refresh-token",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(configRefresh)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        sessionStorage.setItem("user", JSON.stringify(response.data));
        // console.log("berhasil refresh");
      })
      .catch(function (error) {
        // console.log(error);
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("email");
        window.location.replace("/auth/login");
      });
  }, []);

  useEffect(() => {
    props.getUserDetail();
    // const interval = setInterval(() => refreshToken(user.access_token), 10000);
    // intervalRef.current = interval;
    // return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => refreshToken(user.refresh_token), 180000);
    intervalRef.current = interval;
    return () => clearInterval(interval);
  }, [refreshToken]);

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
    userId: state.userReducer.dataUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserDetail: () => dispatch(getUserDetail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoutes);
