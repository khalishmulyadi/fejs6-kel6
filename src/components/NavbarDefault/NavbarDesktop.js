import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import setLoginStatus from "../../redux/actions/setLoginStatus";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

import Notifikasi from "../Nofitikasi/Notifikasi";

const NavbarDesktop = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // useEffect(() => {
  //   try {
  //     props.setLoginStatus();
  //     setIsLoggedIn(true);
  //   } catch (err) {
  //     setIsLoggedIn(false);
  //   }
  // }, []);
  // console.log(props.loginStatus);

  const navigate = useNavigate();
  const handleLogout = () => {
    authService.logout();
    window.location.replace("/auth/login");
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-3 mt-3 ">
            <div className="logo_website"></div>
          </div>
          <div className="col-6">
            <div className="container">
              <form className="d-flex">
                <div className="input-group search_bar mt-3">
                  <input className="form-control search_input" type="search" placeholder="Cari di sini..." aria-label="Search" aria-describedby="button-addon2" />
                  <button className="btn search_button" id="button-addon2" type="submit">
                    <i className="bi bi-search"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {props.loginStatus ? (
            <div className="col-3">
              <div className="btn-group drop_menu">
                <button type="button" className="btn mt-3 dropdown-toggle menu_user">
                  <a href="/daftar-jual">
                    <i className="bi bi-list-ul"></i>
                  </a>
                </button>
              </div>

              <div className="btn-group drop_notif">
                <button type="button" className="btn mt-3 dropdown-toggle notifikasi_user" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="bi bi-bell"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <a className="dropdown-item px-4" href="/#">
                      <Notifikasi />
                    </a>
                    <a className="dropdown-item px-4" href="/#">
                      <Notifikasi />
                    </a>
                    <a className="dropdown-item px-4" href="/#">
                      <Notifikasi />
                    </a>
                  </li>
                  {/* <li>
                    <a className="dropdown-item" href="/#">
                      <Notifikasi />
                    </a>
                  </li> */}
                </ul>
              </div>

              <div className="btn-group drop_profile">
                <button type="button" className="btn mt-3 dropdown-toggle profile_user" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="bi bi-person"></i>
                </button>

                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <a className="dropdown-item" href="/update-profile">
                      Ubah Akun
                    </a>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Keluar
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="col-3">
              <a type="button" className="btn button_login mt-3" href="/auth/login">
                <span className="me-2">
                  <i className="bi bi-box-arrow-in-right"></i>
                </span>
                Masuk
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loginStatus: state.userReducer.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLoginStatus: () => dispatch(setLoginStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarDesktop);
