import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import setLoginStatus from "../../redux/actions/setLoginStatus";
import { useNavigate } from "react-router-dom";

import "./NavbarDefault.css";
const NavbarMobile = (props) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <button className="btn button_nav_mobile" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop">
              <i className="bi bi-list"></i>
            </button>
          </div>
          <div className="col-8">
            {/*<div className="container-fluid">
               <form className="d-flex">
                <div className="input-group search_bar mt-2">
                  <input className="form-control search_input" type="search" placeholder="Cari di sini..." aria-label="Search" aria-describedby="button-addon2" />
                  <button className="btn search_button" id="button-addon2" type="submit">
                    <i className="bi bi-search"></i>
                  </button>
                </div>
              </form> 
            </div>*/}
            <div>
              <h3 className="mt-3">{props.title}</h3>
            </div>
          </div>
        </div>
      </div>

      {props.loginStatus ? (
        <div className="offcanvas offcanvas-start navbar_mobile" tabIndex="-1" id="offcanvasWithBackdrop" aria-labelledby="offcanvasWithBackdropLabel">
          <div className="offcanvas-header">
            <a href="/homepage">
              <h5 className="offcanvas-title" id="offcanvasWithBackdropLabel">
                AsiX
              </h5>
            </a>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body navbar_list">
            <ul className="list-group list-group-flush">
              <li className="list-group-item ">
                <a href="/notifikasi">Notifikasi</a>
              </li>
              {props.role === 1 && (
                <li className="list-group-item">
                  <a href="/daftar-beli">Daftar Pembelian</a>
                </li>
              )}
              {props.role === 2 && (
                <li className="list-group-item">
                  <a href="/daftar-jual">Daftar Penjualan</a>
                </li>
              )}
              <li className="list-group-item">
                <a href="/akun-saya">Akun Saya</a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="offcanvas offcanvas-start navbar_mobile" tabIndex="-1" id="offcanvasWithBackdrop" aria-labelledby="offcanvasWithBackdropLabel">
          <div className="offcanvas-header">
            <a href="/">
              <h5 className="offcanvas-title" id="offcanvasWithBackdropLabel">
                AsiX
              </h5>
            </a>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body ">
            <a href="/auth/login" type="button" className="btn button_login">
              <span className="me-2">
                <i className="bi bi-box-arrow-in-right"></i>
              </span>
              Masuk
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loginStatus: state.userReducer.isLoggedIn,
    role: state.userReducer.role,
    userId: state.userReducer.idUser,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setLoginStatus: () => dispatch(setLoginStatus()),
//   };
// };

export default connect(mapStateToProps)(NavbarMobile);
